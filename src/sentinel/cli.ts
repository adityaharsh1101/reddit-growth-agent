import { PROJECTS_CONFIG } from '../config/projects.js';
import { AIClassifier } from './aiClassifier.js';
import { LeadStorage } from './leadStorage.js';
import { RedditScanner } from './redditScanner.js';

const scanner = new RedditScanner();
const classifier = new AIClassifier();
const storage = new LeadStorage();

async function runScan(targetProjectId?: string, targetCluster?: string) {
  console.log('================================================================');
  console.log('🤖 REDDIT GROWTH & LEAD SENTINEL AGENT — SCANNER INITIATED');
  console.log(`⏰ Time: ${new Date().toISOString()}`);
  if (targetProjectId) {
    console.log(`🎯 Target Project: ${targetProjectId.toUpperCase()}`);
  } else if (targetCluster) {
    console.log(`📂 Target Cluster: ${targetCluster.toUpperCase()}`);
  } else {
    console.log('🌐 Target: All Registered Studio Projects');
  }
  console.log('================================================================');

  const seenIds = storage.getSeenPostIds();
  let rawPosts = [];

  if (targetProjectId && PROJECTS_CONFIG[targetProjectId]) {
    const project = PROJECTS_CONFIG[targetProjectId];
    rawPosts = await scanner.scanForProject(project, 20);
  } else if (targetCluster) {
    rawPosts = await scanner.scanCluster(targetCluster);
  } else {
    rawPosts = await scanner.scanAllProjects();
  }

  // Filter out already seen posts
  const unseenPosts = rawPosts.filter(p => !seenIds.has(p.id));
  console.log(`\n📥 Total Posts Fetched: ${rawPosts.length} | New Unseen: ${unseenPosts.length}`);

  if (unseenPosts.length === 0) {
    console.log('✨ No new unseen posts found. Database is up to date.');
    return;
  }

  // Classify with AI
  const qualifiedLeads = await classifier.classifyBatch(unseenPosts, targetProjectId);
  const savedCount = storage.saveLeads(qualifiedLeads);

  console.log('\n================================================================');
  console.log(`🎉 SCAN COMPLETED: ${savedCount} high-intent leads added to inbox!`);
  console.log('================================================================\n');

  printSummary();
}

function printSummary() {
  const analytics = storage.getAnalytics();
  console.log('📊 LEADS INBOX OVERVIEW:');
  console.log(`   - Total Qualified Leads: ${analytics.totalLeads}`);
  console.log(`   - 🔥 High Intent (Score >= 80): ${analytics.highIntentLeads}`);
  console.log(`   - ✉️  Replied: ${analytics.repliedLeads}`);
  console.log(`   - 📌 Bookmarked: ${analytics.bookmarkedLeads}`);
  console.log('   - Distribution by Cluster:');
  for (const [cl, count] of Object.entries(analytics.byCluster || {})) {
    console.log(`      * ${cl}: ${count} leads`);
  }
  console.log('   - Distribution by Project:');
  for (const [proj, count] of Object.entries(analytics.byProject)) {
    console.log(`      * ${proj}: ${count} leads`);
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--stats')) {
    printSummary();
    return;
  }

  let projectArg: string | undefined;
  const projectIdx = args.indexOf('--project');
  if (projectIdx !== -1 && args[projectIdx + 1]) {
    projectArg = args[projectIdx + 1].toLowerCase();
  }

  let clusterArg: string | undefined;
  const clusterIdx = args.indexOf('--cluster');
  if (clusterIdx !== -1 && args[clusterIdx + 1]) {
    clusterArg = args[clusterIdx + 1];
  }

  if (args.includes('--watch')) {
    console.log('🔄 Starting Reddit Growth Sentinel in continuous watch mode (every 30 mins)...');
    await runScan(projectArg, clusterArg);
    setInterval(async () => {
      try {
        await runScan(projectArg, clusterArg);
      } catch (err: any) {
        console.error('❌ Error during scheduled scan cycle:', err.message);
      }
    }, 30 * 60 * 1000);
  } else {
    await runScan(projectArg, clusterArg);
  }
}

main().catch(err => {
  console.error('Fatal Sentinel Error:', err);
});
