/* ============================================================
   First SmartServe AI — script.js
   All interactions, mock data, charts, and navigation
   ============================================================ */

'use strict';

/* ── MOCK DATA ──────────────────────────────────────────────── */
const MOCK_JOBS = [
  { id: '#2026-04182', matter: 'Smith v Johnson',     defendant: 'Robert Johnson',   address: '1842 Mulholland Dr',    court: 'LA County Superior',      deadline: 'Jun 18, 2026', server: 'M. Torres', serverInitials: 'MT', serverColor: '#16A34A', attempts: 3, priority: 'High',   status: 'In Progress', statusClass: 'badge-warning', action: 'view'    },
  { id: '#2026-04155', matter: 'Hernandez v City',    defendant: 'Maria Hernandez',  address: '406 S Grand Ave',       court: 'LA County Superior',      deadline: 'Jun 22, 2026', server: 'S. Lee',    serverInitials: 'SL', serverColor: '#2563EB', attempts: 1, priority: 'Med',    status: 'Completed',   statusClass: 'badge-success', action: 'view'    },
  { id: '#2026-04128', matter: 'Rivera v Bayshore',   defendant: 'Carlos Rivera',    address: '1428 Sunset Blvd',      court: 'Orange County Superior',  deadline: 'Jun 14, 2026', server: 'J. Rivera', serverInitials: 'JR', serverColor: '#F59E0B', attempts: 3, priority: 'High',   status: 'Overdue',     statusClass: 'badge-danger',  action: 'escalate'},
  { id: '#2026-04099', matter: 'Wells v Morton',      defendant: 'Patricia Morton',  address: '8821 Venice Blvd',      court: 'LA County Superior',      deadline: 'Jun 28, 2026', server: 'D. Kim',    serverInitials: 'DK', serverColor: '#0B2E59', attempts: 1, priority: 'Normal', status: 'Completed',   statusClass: 'badge-success', action: 'view'    },
  { id: '#2026-04211', matter: 'Patel v Realty Corp', defendant: 'Anjali Patel',     address: '3301 Wilshire Blvd',    court: 'LA County Superior',      deadline: 'Jul 02, 2026', server: 'R. Wilson', serverInitials: 'RW', serverColor: '#DC2626', attempts: 0, priority: 'High',   status: 'Assigned',    statusClass: 'badge-info',    action: 'view'    },
  { id: '#2026-04088', matter: 'Cooper v State Farm', defendant: 'Brian Cooper',     address: '721 N Figueroa St',     court: 'San Bernardino Superior', deadline: 'Jun 15, 2026', server: 'L. Nguyen', serverInitials: 'LN', serverColor: '#16A34A', attempts: 2, priority: 'High',   status: 'Overdue',     statusClass: 'badge-danger',  action: 'escalate'},
];

const AI_RESPONSES = {
  'show all overdue': `
    <div class="ai-result-row"><span style="font-weight:600;color:#0B2E59">Rivera v Bayshore</span><span class="badge badge-danger">Due Jun 14</span></div>
    <div class="ai-result-row"><span style="font-weight:600;color:#0B2E59">Cooper v State Farm</span><span class="badge badge-danger">Due Jun 15</span></div>
    <div class="ai-result-row"><span style="font-weight:600;color:#0B2E59">Tran v Allied Med</span><span class="badge badge-warning">Due Jun 16</span></div>
    <div class="ai-result-row"><span style="font-weight:600;color:#0B2E59">Williams v Landlord</span><span class="badge badge-warning">Due Jun 17</span></div>
    <div style="font-size:11px;color:#8A95A3;margin-top:8px">4 jobs require immediate attention. Rivera v Bayshore is 3 days past deadline — escalation recommended.</div>`,

  'which servers are performing below': `
    <div class="ai-result-row"><span style="font-weight:600;color:#0B2E59">Robert Wilson</span><span style="color:#DC2626;font-weight:600">82.1% success rate</span></div>
    <div class="ai-result-row"><span style="font-weight:600;color:#0B2E59">James Rivera</span><span style="color:#F59E0B;font-weight:600">88.4% success rate</span></div>
    <div style="font-size:11px;color:#8A95A3;margin-top:8px">Team average is 91.2%. Wilson is 9.1% below average with 4 failed attempts this month. Recommend performance review.</div>`,

  'summarize smith': `
    <div style="font-weight:700;color:#0B2E59;margin-bottom:8px">Smith v Johnson — #2026-04182</div>
    <div class="ai-result-row"><span style="color:#8A95A3">Status</span><span class="badge badge-warning">In Progress</span></div>
    <div class="ai-result-row"><span style="color:#8A95A3">Deadline</span><span style="color:#DC2626;font-weight:600">June 18, 2026 — 6 days</span></div>
    <div class="ai-result-row"><span style="color:#8A95A3">Attempts</span><span>3 (2 failed, 1 scheduled)</span></div>
    <div class="ai-result-row"><span style="color:#8A95A3">Assigned</span><span>Michael Torres</span></div>
    <div style="font-size:11px;color:#8A95A3;margin-top:8px">Defendant confirmed at address (Attempt #2). Best serve window: 6–8 PM today. Torres scheduled for 6:30 PM. Probability: 87%.</div>`,

  'identify routes': `
    <div style="font-size:12px;margin-bottom:8px">3 routes identified for significant savings:</div>
    <div class="ai-result-row"><span>Torres Route A</span><span style="color:#16A34A;font-weight:600">↓ 22% travel time</span></div>
    <div class="ai-result-row"><span>Kim Route B</span><span style="color:#16A34A;font-weight:600">↓ 16% travel time</span></div>
    <div class="ai-result-row"><span>Rivera Route C</span><span style="color:#F59E0B;font-weight:600">↓ 11% travel time</span></div>
    <div style="font-size:11px;color:#8A95A3;margin-top:8px">Applying all optimizations saves 4.2 hours and 31 miles combined. Est. fuel savings: $48.</div>`,

  'show jobs with multiple': `
    <div class="ai-result-row"><span style="font-weight:600;color:#0B2E59">Rivera v Bayshore</span><span class="badge badge-danger">3 failed</span></div>
    <div class="ai-result-row"><span style="font-weight:600;color:#0B2E59">Smith v Johnson</span><span class="badge badge-danger">2 failed</span></div>
    <div class="ai-result-row"><span style="font-weight:600;color:#0B2E59">Cooper v State Farm</span><span class="badge badge-warning">2 failed</span></div>
    <div class="ai-result-row"><span style="font-weight:600;color:#0B2E59">Williams v Landlord</span><span class="badge badge-warning">2 failed</span></div>
    <div style="font-size:11px;color:#8A95A3;margin-top:8px">Rivera and Smith may require sub-service or skip-trace. Recommend reviewing service windows for evasion patterns.</div>`,

  'which assignments may miss': `
    <div style="font-size:12px;margin-bottom:8px">Deadline risk analysis — next 7 days:</div>
    <div class="ai-result-row"><span style="font-weight:600;color:#DC2626">Rivera v Bayshore</span><span style="color:#DC2626">Already missed</span></div>
    <div class="ai-result-row"><span style="font-weight:600;color:#DC2626">Cooper v State Farm</span><span style="color:#DC2626">95% miss risk</span></div>
    <div class="ai-result-row"><span style="font-weight:600;color:#F59E0B">Tran v Allied Med</span><span style="color:#F59E0B">72% miss risk</span></div>
    <div class="ai-result-row"><span style="font-weight:600;color:#F59E0B">Smith v Johnson</span><span style="color:#F59E0B">31% miss risk</span></div>
    <div style="font-size:11px;color:#8A95A3;margin-top:8px">Immediate escalation recommended for Cooper and Rivera. Smith v Johnson scheduled for today — on track if 6:30 PM attempt succeeds.</div>`,

  'predict': `
    <div style="font-size:12px;margin-bottom:8px">AI deadline prediction model — next 14 days:</div>
    <div class="ai-result-row"><span style="font-weight:600;color:#DC2626">3 jobs</span><span style="color:#DC2626">Critical risk (&gt;80%)</span></div>
    <div class="ai-result-row"><span style="font-weight:600;color:#F59E0B">5 jobs</span><span style="color:#F59E0B">Moderate risk (40–80%)</span></div>
    <div class="ai-result-row"><span style="font-weight:600;color:#16A34A">318 jobs</span><span style="color:#16A34A">On track (&lt;40%)</span></div>
    <div style="font-size:11px;color:#8A95A3;margin-top:8px">Recommend immediate action on Rivera, Cooper, and Tran cases. Route optimization applied to at-risk jobs could reduce miss probability by 18%.</div>`
};

const PAGE_TITLES = {
  dashboard: 'Field Operations Dashboard',
  jobs:      'Service Jobs',
  jobdetail: 'Smith v Johnson — Job Detail',
  fieldmap:  'Field Map — Live Operations',
  routes:    'Route Optimization',
  servers:   'Process Server Performance',
  analytics: 'Analytics & Reporting',
  documents: 'Document Center',
  ai:        'SmartServe AI Assistant',
  settings:  'Settings'
};

/* ── NAVIGATION ─────────────────────────────────────────────── */
function navigate(page, el) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Deactivate all nav items
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  // Show target page
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');

  // Activate nav item
  if (el) {
    el.classList.add('active');
  } else {
    // Find the nav item by data-page
    const navItem = document.querySelector('[data-page="' + page + '"]');
    if (navItem) navItem.classList.add('active');
  }

  // Update page title
  const titleEl = document.getElementById('page-title');
  if (titleEl) titleEl.textContent = PAGE_TITLES[page] || page;

  // Close sidebar on mobile after navigating
  closeMobileSidebar();

  // Scroll content to top
  const content = document.getElementById('content');
  if (content) content.scrollTop = 0;
}

/* ── MOBILE SIDEBAR ─────────────────────────────────────────── */
function toggleMobileSidebar() {
  const sidebar  = document.getElementById('sidebar');
  const overlay  = document.getElementById('sidebar-overlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar)  sidebar.classList.remove('open');
  if (overlay)  overlay.classList.remove('open');
}

/* ── MODALS ─────────────────────────────────────────────────── */
function showModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('open');
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
}

// Close modal on overlay click
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

// Close modal on Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
  }
});

/* ── TOAST NOTIFICATIONS ────────────────────────────────────── */
function toast(msg, type) {
  type = type || 'success';
  const icons  = { success: '✓', warning: '⚠', error: '✕' };
  const container = document.getElementById('toast-container');
  if (!container) return;

  const t = document.createElement('div');
  t.className = 'toast ' + type;
  t.innerHTML =
    '<span class="toast-icon">' + icons[type] + '</span>' +
    '<span class="toast-msg">' + msg + '</span>';

  container.appendChild(t);
  setTimeout(function() {
    t.style.opacity = '0';
    t.style.transition = 'opacity 0.3s';
    setTimeout(function() { t.remove(); }, 300);
  }, 3200);
}

/* ── MAP PIN TOOLTIPS ───────────────────────────────────────── */
function showPinTooltip(pin, text, mapId) {
  mapId = mapId || 'mapTip';
  const tip = document.getElementById(mapId);
  if (!tip) return;

  const map = pin.closest('.map-container');
  if (!map) return;

  const mapRect = map.getBoundingClientRect();
  const pinRect = pin.getBoundingClientRect();

  tip.style.left  = (pinRect.left - mapRect.left - 10) + 'px';
  tip.style.top   = (pinRect.top  - mapRect.top  - 65) + 'px';
  tip.innerHTML   = text.replace(/\n/g, '<br>');
  tip.classList.add('visible');

  setTimeout(function() { tip.classList.remove('visible'); }, 2500);
}

/* ── FIELD MAP SERVER DETAIL ────────────────────────────────── */
function selectServer(name, detail, rate, status) {
  const panel = document.getElementById('server-detail-content');
  if (!panel) return;

  const isServer = !name.includes('Failed');
  const initials = isServer
    ? name.split(' ').map(function(w) { return w[0]; }).join('')
    : '!!';

  if (isServer) {
    panel.innerHTML =
      '<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">' +
        '<div class="user-avatar" style="width:40px;height:40px;font-size:14px;background:var(--navy)">' + initials + '</div>' +
        '<div>' +
          '<div style="font-size:14px;font-weight:700;color:var(--navy)">' + name + '</div>' +
          '<div style="font-size:11px;color:var(--gray-400)">' + status + '</div>' +
        '</div>' +
      '</div>' +
      '<div style="font-size:12px;color:var(--gray-600);margin-bottom:10px">' + detail + '</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">' +
        '<div class="stat-mini"><div class="stat-mini-val">' + rate + '</div><div class="stat-mini-lbl">Success Rate</div></div>' +
        '<div class="stat-mini"><div class="stat-mini-val">3 jobs</div><div class="stat-mini-lbl">Today</div></div>' +
      '</div>' +
      '<div style="display:flex;gap:8px">' +
        '<button class="btn btn-primary btn-sm" style="flex:1" onclick="toast(\'Assigning new job to ' + name + '...\',\'success\')">Assign Job</button>' +
        '<button class="btn btn-outline btn-sm" onclick="toast(\'Contacting ' + name + '...\',\'success\')">Contact</button>' +
      '</div>';
  } else {
    panel.innerHTML =
      '<div style="background:var(--red-bg);border-radius:8px;padding:14px;text-align:center">' +
        '<div style="font-size:16px;margin-bottom:6px">❌</div>' +
        '<div style="font-size:13px;font-weight:700;color:var(--red)">Failed Attempt Location</div>' +
        '<div style="font-size:12px;color:var(--gray-600);margin-top:4px">' + detail + '</div>' +
        '<div style="font-size:11px;color:var(--gray-400);margin-top:4px">' + status + '</div>' +
        '<button class="btn btn-danger btn-sm" style="margin-top:10px;width:100%" onclick="toast(\'Scheduling retry attempt...\',\'success\')">Schedule Retry</button>' +
      '</div>';
  }
}

/* ── TABLE SORT ─────────────────────────────────────────────── */
function sortTable(th) {
  const allIcons = th.closest('table').querySelectorAll('.sort-icon');
  allIcons.forEach(function(i) { i.textContent = '↕'; });

  const icon = th.querySelector('.sort-icon');
  if (icon) icon.textContent = (icon.textContent === '↑') ? '↓' : '↑';

  toast('Table sorted', 'success');
}

/* ── JOB FILTER ─────────────────────────────────────────────── */
function filterJobs(val) {
  const label = val ? val.replace('-', ' ') : 'all jobs';
  toast('Filtered: ' + label, 'success');
}

/* ── ANALYTICS TABS ─────────────────────────────────────────── */
function setTab(el, period) {
  const tabGroup = el.closest('.tabs');
  if (tabGroup) {
    tabGroup.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('active'); });
  }
  el.classList.add('active');
  toast('Showing ' + period + ' analytics', 'success');
}

/* ── AI ASSISTANT ───────────────────────────────────────────── */
function sendAIMessage(text) {
  const input = document.getElementById('chat-input');
  if (input) {
    input.value = text;
    sendChatMessage();
  }
}

function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const container = document.getElementById('chat-messages');
  if (!input || !container) return;

  const text = input.value.trim();
  if (!text) return;

  // Append user message
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-msg user';
  userMsg.innerHTML =
    '<div class="chat-bubble">' + escapeHtml(text) + '</div>' +
    '<div class="chat-meta">You · Just now</div>';
  container.appendChild(userMsg);

  input.value = '';
  container.scrollTop = container.scrollHeight;

  // Find matching response
  setTimeout(function() {
    const key = text.toLowerCase();
    let content = null;

    for (var k in AI_RESPONSES) {
      if (key.indexOf(k) !== -1) {
        content = AI_RESPONSES[k];
        break;
      }
    }

    if (!content) {
      content =
        '<div style="margin-bottom:8px">Based on current field data:</div>' +
        '<div class="ai-result-row"><span>Active jobs</span><span style="font-weight:600">326</span></div>' +
        '<div class="ai-result-row"><span>Servers in field</span><span style="font-weight:600">47</span></div>' +
        '<div class="ai-result-row"><span>Today\'s success rate</span><span style="font-weight:600;color:#16A34A">91.2%</span></div>' +
        '<div style="font-size:11px;color:#8A95A3;margin-top:8px">I can provide more specific insights about individual jobs, servers, or routing. What would you like to know?</div>';
    }

    const aiMsg = document.createElement('div');
    aiMsg.className = 'chat-msg assistant';
    aiMsg.innerHTML =
      '<div class="chat-bubble">' + content + '</div>' +
      '<div class="chat-meta">SmartServe AI · Just now</div>';
    container.appendChild(aiMsg);
    container.scrollTop = container.scrollHeight;
  }, 700);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

/* ── CHART INSTANCES ────────────────────────────────────────── */
var chartInstances = {};

function destroyChart(id) {
  if (chartInstances[id]) {
    chartInstances[id].destroy();
    delete chartInstances[id];
  }
}

function initCharts() {
  // Only init charts whose canvas elements exist in the DOM

  // ── Dashboard hourly activity
  var dashEl = document.getElementById('dashActivityChart');
  if (dashEl && !chartInstances['dashActivityChart']) {
    destroyChart('dashActivityChart');
    chartInstances['dashActivityChart'] = new Chart(dashEl, {
      type: 'bar',
      data: {
        labels: ['8a','9a','10a','11a','12p','1p','2p','3p','4p'],
        datasets: [
          { label: 'Completed', data: [4,8,14,18,12,22,16,14,10], backgroundColor: '#16A34A', barPercentage: 0.6 },
          { label: 'Attempted', data: [6,10,16,20,15,26,20,18,14], backgroundColor: '#E8ECF0', barPercentage: 0.6 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: '#F0F0F0' }, ticks: { font: { size: 10 } } }
        }
      }
    });
  }

  // ── Success rate trend
  var srEl = document.getElementById('successRateChart');
  if (srEl && !chartInstances['successRateChart']) {
    destroyChart('successRateChart');
    chartInstances['successRateChart'] = new Chart(srEl, {
      type: 'line',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun'],
        datasets: [{
          label: 'Success Rate %',
          data: [86, 87.5, 89, 88.2, 90.4, 91.2],
          borderColor: '#D4AF37',
          backgroundColor: 'rgba(212,175,55,0.08)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#D4AF37',
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { min: 82, max: 96, grid: { color: '#F0F0F0' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // ── Failed attempts by region
  var frEl = document.getElementById('failedRegionChart');
  if (frEl && !chartInstances['failedRegionChart']) {
    destroyChart('failedRegionChart');
    chartInstances['failedRegionChart'] = new Chart(frEl, {
      type: 'bar',
      data: {
        labels: ['West LA','East LA','Central','South Bay','OC'],
        datasets: [{
          label: 'Failed Attempts',
          data: [8,14,6,4,9],
          backgroundColor: ['#DC2626','#DC2626','#F59E0B','#16A34A','#DC2626']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: '#F0F0F0' } }
        }
      }
    });
  }

  // ── Workload by server
  var wlEl = document.getElementById('workloadChart');
  if (wlEl && !chartInstances['workloadChart']) {
    destroyChart('workloadChart');
    chartInstances['workloadChart'] = new Chart(wlEl, {
      type: 'bar',
      indexAxis: 'y',
      data: {
        labels: ['M. Torres','D. Kim','S. Lee','L. Nguyen','J. Rivera','R. Wilson'],
        datasets: [{
          label: 'Jobs Assigned',
          data: [24,21,18,19,16,14],
          backgroundColor: '#0B2E59'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: '#F0F0F0' } },
          y: { grid: { display: false }, ticks: { font: { size: 11 } } }
        }
      }
    });
  }

  // ── Monthly volume
  var mvEl = document.getElementById('volumeChart');
  if (mvEl && !chartInstances['volumeChart']) {
    destroyChart('volumeChart');
    chartInstances['volumeChart'] = new Chart(mvEl, {
      type: 'bar',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun'],
        datasets: [
          { label: 'Completed',       data: [298,312,334,318,341,326], backgroundColor: '#0B2E59' },
          { label: 'Total Received',  data: [320,338,358,344,370,356], backgroundColor: '#E8ECF0' }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { font: { size: 11 }, boxWidth: 10, padding: 12 }
          }
        },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: '#F0F0F0' } }
        }
      }
    });
  }
}

/* ── GLOBAL SEARCH ──────────────────────────────────────────── */
function initSearch() {
  var input = document.getElementById('global-search');
  if (!input) return;

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      var val = input.value.trim();
      if (val) {
        toast('Searching: "' + val + '"', 'success');
      }
    }
  });
}

/* ── TOGGLE SWITCHES (Settings page) ───────────────────────── */
function initToggles() {
  document.querySelectorAll('.toggle-switch').forEach(function(sw) {
    sw.addEventListener('click', function() {
      var isOn = sw.dataset.on === 'true';
      sw.dataset.on = isOn ? 'false' : 'true';
      sw.style.background = isOn ? 'var(--gray-200)' : 'var(--green)';
      var thumb = sw.querySelector('.toggle-thumb');
      if (thumb) {
        thumb.style.transform = isOn ? 'translateX(0)' : 'translateX(18px)';
      }
      toast(sw.dataset.label + (isOn ? ' disabled' : ' enabled'), 'success');
    });
  });
}

/* ── INIT ON DOM READY ──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {

  /* Wire up mobile menu toggle */
  var menuToggle = document.getElementById('menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileSidebar);
  }

  /* Wire up sidebar overlay close */
  var overlay = document.getElementById('sidebar-overlay');
  if (overlay) {
    overlay.addEventListener('click', closeMobileSidebar);
  }

  /* Wire AI chat Enter key */
  var chatInput = document.getElementById('chat-input');
  if (chatInput) {
    chatInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendChatMessage();
      }
    });
  }

  /* Init search */
  initSearch();

  /* Init toggle switches */
  initToggles();

  /* Init charts (for any visible on load — dashboard is default) */
  initCharts();
});

/* Re-init charts when analytics page is navigated to,
   since canvases may not have been rendered yet on first load */
var _origNavigate = navigate;
navigate = function(page, el) {
  _origNavigate(page, el);
  /* Small delay to allow display:block to take effect */
  setTimeout(initCharts, 50);
};
