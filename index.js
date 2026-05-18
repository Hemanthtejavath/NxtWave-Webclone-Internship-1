// ============================================================================
// NOVA FINANCIAL DASHBOARD - JAVASCRIPT
// ============================================================================

// ======================== DOM ELEMENTS ========================
const navLinks = document.querySelectorAll("[data-section-target]");
const sections = document.querySelectorAll(".page-section");
const pageTitle = document.getElementById("pageTitle");
const pageSubtitle = document.getElementById("pageSubtitle");
const transactionList = document.getElementById("transactionList");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchbar = document.getElementById("searchbar");
const categoryList = document.getElementById("categoryList");
const budgetList = document.getElementById("budgetList");
const subscriptionList = document.getElementById("subscriptionList");
const subscriptionsTotal = document.getElementById("subscriptionsTotal");
const spendingRangeButtons = document.querySelectorAll("[data-spending-range]");
const incomeRangeButtons = document.querySelectorAll("[data-income-range]");
const cardBalance = document.getElementById("cardBalance");
const cardNumber = document.getElementById("cardNumber");
const cardExpiry = document.getElementById("cardExpiry");
const detailNumber = document.getElementById("detailNumber");
const detailExpiry = document.getElementById("detailExpiry");
const detailStatus = document.getElementById("detailStatus");
const cardDots = document.getElementById("cardDots");
const freezeToggle = document.getElementById("freezeToggle");
const limitSlider = document.getElementById("limitSlider");
const limitValue = document.getElementById("limitValue");
const darkModeToggle = document.getElementById("darkModeToggle");
const upgradeBtn = document.getElementById("upgradeBtn");

// ======================== STATE VARIABLES ========================
let currentFilter = "all";
let activeCardIndex = 0;
let spendingChart;
let categoryChart;
let incomeExpenseChart;
let analyticsChartsReady = false;

// ======================== SECTION CONTENT ========================
const sectionContent = {
  section1: {
    title: "Dashboard",
    subtitle: "Overview of your financial activity",
  },
  section2: {
    title: "Transactions",
    subtitle: "Track all your financial activity",
  },
  section3: {
    title: "Analytics",
    subtitle: "Section 3 insights into budgets, categories and subscriptions",
  },
  section4: {
    title: "My Cards",
    subtitle: "Manage your cards and spending limits",
  },
  section5: {
    title: "My Profile",
    subtitle: "Manage your preferences",
  },
};

// ======================== CHART DATA ========================
const spendingActivityData = {
  week: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [240, 180, 420, 310, 565, 234, 155],
  },
  month: {
    categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
    values: [1290, 1680, 1450, 1895],
  },
};

const categorySpending = [
  { name: "Shopping", percent: 34, color: "#3b82f6" },
  { name: "Food", percent: 19, color: "#f59e0b" },
  { name: "Transport", percent: 11, color: "#16a34a" },
  { name: "Entertainment", percent: 8, color: "#8b5cf6" },
  { name: "Bills", percent: 24, color: "#ef4444" },
  { name: "Health", percent: 4, color: "#06b6d4" },
];

const monthlyBudgets = [
  { name: "Shopping", spent: 1250, limit: 1500 },
  { name: "Food & Dining", spent: 680, limit: 800 },
  { name: "Transport", spent: 420, limit: 400 },
  { name: "Entertainment", spent: 280, limit: 300 },
  { name: "Bills & Utilities", spent: 890, limit: 1000 },
];

const incomeExpenseData = {
  six: {
    labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
    income: [6100, 7000, 6700, 7450, 8150, 8200],
    expenses: [3800, 4200, 3600, 4100, 4800, 3850],
  },
  year: {
    labels: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
    income: [5600, 5900, 6200, 6400, 6750, 6900, 6100, 7000, 6700, 7450, 8150, 8200],
    expenses: [3400, 3700, 3900, 3600, 4100, 3950, 3800, 4200, 3600, 4100, 4800, 3850],
  },
};

const subscriptions = [
  { name: "Netflix", next: "Jan 20", price: 15.99 },
  { name: "Spotify", next: "Jan 22", price: 9.99 },
  { name: "iCloud", next: "Jan 25", price: 2.99 },
  { name: "Adobe CC", next: "Feb 1", price: 54.99 },
  { name: "Rent", next: "Feb 1", price: 1850 },
];

const userCards = [
  { balance: 12450, number: "4532", expiry: "12/26", status: "Active" },
  { balance: 8240, number: "7781", expiry: "09/27", status: "Active" },
  { balance: 5300, number: "9024", expiry: "04/28", status: "Active" },
];

const transactions = [
  {
    name: "Apple Store",
    date: "Jan 15, 10:30 AM",
    category: "Shopping",
    status: "Completed",
    amount: -999.0,
    icon: "bag-check",
    colorClass: "icon-bg-blue",
  },
  {
    name: "Salary Deposit",
    date: "Jan 15, 9:00 AM",
    category: "Income",
    status: "Completed",
    amount: 5200.0,
    icon: "briefcase",
    colorClass: "icon-bg-green",
  },
  {
    name: "Uber Eats",
    date: "Jan 14, 7:45 PM",
    category: "Food",
    status: "Completed",
    amount: -32.5,
    icon: "fork-knife",
    colorClass: "icon-bg-yellow",
  },
  {
    name: "Netflix",
    date: "Jan 14, 12:00 AM",
    category: "Entertainment",
    status: "Completed",
    amount: -15.99,
    icon: "tv",
    colorClass: "icon-bg-purple",
  },
  {
    name: "Shell Gas Station",
    date: "Jan 13, 4:20 PM",
    category: "Transport",
    status: "Completed",
    amount: -65.4,
    icon: "ev-front",
    colorClass: "icon-bg-cyan",
  },
  {
    name: "Whole Foods",
    date: "Jan 13, 11:00 AM",
    category: "Groceries",
    status: "Completed",
    amount: -127.83,
    icon: "cart",
    colorClass: "icon-bg-blue",
  },
  {
    name: "Freelance Payment",
    date: "Jan 12, 2:30 PM",
    category: "Income",
    status: "Pending",
    amount: 1500.0,
    icon: "briefcase",
    colorClass: "icon-bg-green",
  },
  {
    name: "Amazon",
    date: "Jan 12, 8:15 AM",
    category: "Shopping",
    status: "Completed",
    amount: -89.99,
    icon: "cart",
    colorClass: "icon-bg-blue",
  },
  {
    name: "Starbucks",
    date: "Jan 11, 7:30 AM",
    category: "Food",
    status: "Completed",
    amount: -6.75,
    icon: "cup-straw",
    colorClass: "icon-bg-yellow",
  },
  {
    name: "Gym Membership",
    date: "Jan 10, 12:00 AM",
    category: "Health",
    status: "Completed",
    amount: -49.99,
    icon: "heart-pulse",
    colorClass: "icon-bg-purple",
  },
];

// ======================== NAVIGATION ========================
function setActiveNav() {
  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      const targetId = this.dataset.sectionTarget;
      const targetSection = document.getElementById(targetId);

      if (!targetSection) return;

      event.preventDefault();

      navLinks.forEach((item) => {
        item.classList.toggle("active-link", item.dataset.sectionTarget === targetId);
      });

      sections.forEach((section) => {
        section.classList.toggle("active-section", section.id === targetId);
      });

      pageTitle.textContent = sectionContent[targetId].title;
      pageSubtitle.textContent = sectionContent[targetId].subtitle;

      if (targetId === "section3") {
        initAnalyticsCharts();
      }
    });
  });
}

// ======================== FORMATTING ========================
function formatAmount(amount) {
  const formatted = Math.abs(amount).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return amount >= 0 ? `+ $${formatted}` : `- $${formatted}`;
}

function formatCurrency(value, options = {}) {
  return value.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: options.minimumFractionDigits ?? 0,
    maximumFractionDigits: options.maximumFractionDigits ?? 2,
  });
}

// ======================== TRANSACTIONS ========================
function renderTransactions(filter = "all", searchText = "") {
  const normalizedSearch = searchText.toLowerCase().trim();
  const filtered = transactions.filter((transaction) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "income" && transaction.amount >= 0) ||
      (filter === "expense" && transaction.amount < 0) ||
      (filter === "pending" && transaction.status.toLowerCase() === "pending");

    const matchesSearch =
      normalizedSearch === "" ||
      transaction.name.toLowerCase().includes(normalizedSearch) ||
      transaction.category.toLowerCase().includes(normalizedSearch) ||
      transaction.status.toLowerCase().includes(normalizedSearch);

    return matchesFilter && matchesSearch;
  });

  transactionList.innerHTML = filtered
    .map(
      (transaction) => `
      <div class="transaction-item">
        <div class="transaction-item-left">
          <div class="transaction-icon ${transaction.colorClass}">
            <i class="bi bi-${transaction.icon}"></i>
          </div>
          <div class="transaction-detail">
            <p class="transaction-name">${transaction.name}</p>
            <p class="transaction-meta">${transaction.date}</p>
          </div>
        </div>
        <div class="d-flex">
        <div class="transaction-tags">
              <span class="transaction-badge">${transaction.category}</span>
              <span class="status-badge ${transaction.status.toLowerCase() === "pending" ? "pending" : "completed"}">${transaction.status}</span>
            </div>
        <div class="transaction-amount ${transaction.amount >= 0 ? "income" : "expense"}">${formatAmount(transaction.amount)}</div>
        </div>
      </div>
    `,
    )
    .join("");
}

function bindFilters() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      currentFilter = button.dataset.filter;
      renderTransactions(currentFilter, searchbar.value);
    });
  });
}

// ======================== SPENDING ACTIVITY CHART ========================
function initChart() {
  const options = {
    series: [
      {
        name: "Spent",
        data: spendingActivityData.week.values,
      },
    ],
    chart: {
      type: "area",
      height: 330,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 3.5,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#3b82f6"],
    fill: {
      type: "solid",
      opacity: 0.12,
    },
    grid: {
      borderColor: "#dce5f2",
      strokeDashArray: 0,
      xaxis: {
        lines: { show: false },
      },
      yaxis: {
        lines: { show: true },
      },
    },
    xaxis: {
      categories: spendingActivityData.week.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: "#65758f", fontSize: "14px" },
      },
    },
    yaxis: {
      min: 150,
      max: 600,
      tickAmount: 9,
      labels: {
        style: { colors: "#65758f", fontSize: "14px" },
        formatter(value) {
          return "$" + Math.round(value);
        },
      },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter(value) {
          return "$" + value;
        },
      },
    },
    markers: {
      size: 0,
      hover: { size: 7 },
    },
  };

  spendingChart = new ApexCharts(document.querySelector("#chart"), options);
  spendingChart.render();
}

// ======================== ANALYTICS ========================
function renderCategories() {
  categoryList.innerHTML = categorySpending
    .map(
      (category) => `
        <div class="category-item">
          <span class="category-name">
            <span class="category-dot" style="background:${category.color}"></span>
            ${category.name}
          </span>
          <span class="category-percent">${category.percent}%</span>
        </div>
      `,
    )
    .join("");
}

function renderBudgets() {
  budgetList.innerHTML = monthlyBudgets
    .map((budget) => {
      const percentUsed = Math.round((budget.spent / budget.limit) * 100);
      const progressWidth = Math.min(percentUsed, 100);
      const overBudget = budget.spent > budget.limit;
      const warning = overBudget
        ? `<div class="budget-warning">Over budget by ${formatCurrency(budget.spent - budget.limit)}</div>`
        : "";

      return `
        <div class="budget-row">
          <div class="budget-row-top">
            <span>${budget.name}</span>
            <span class="budget-amount">${formatCurrency(budget.spent)} / ${formatCurrency(budget.limit)}</span>
          </div>
          <div class="budget-track">
            <div class="budget-progress ${overBudget ? "over-budget" : ""}" style="--progress-width:${progressWidth}%"></div>
          </div>
          ${warning}
        </div>
      `;
    })
    .join("");
}

function renderSubscriptions() {
  const total = subscriptions.reduce((sum, subscription) => sum + subscription.price, 0);
  subscriptionsTotal.textContent = `${formatCurrency(total)}/mo`;
  subscriptionList.innerHTML = subscriptions
    .map(
      (subscription) => `
        <div class="subscription-row">
          <div class="subscription-left">
            <div class="subscription-icon">
              <i class="bi bi-tv"></i>
            </div>
            <div>
              <p class="subscription-name">${subscription.name}</p>
              <p class="subscription-date">Next: ${subscription.next}</p>
            </div>
          </div>
          <div class="subscription-price">${formatCurrency(subscription.price, { minimumFractionDigits: 2 })}</div>
        </div>
      `,
    )
    .join("");
}

function initAnalyticsCharts() {
  if (analyticsChartsReady) {
    categoryChart.updateOptions({});
    incomeExpenseChart.updateOptions({});
    return;
  }

  const categoryOptions = {
    series: categorySpending.map((category) => category.percent),
    labels: categorySpending.map((category) => category.name),
    chart: {
      type: "donut",
      height: 330,
    },
    colors: categorySpending.map((category) => category.color),
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    stroke: {
      width: 0,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "58%",
          labels: {
            show: false,
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter(value) {
          return `${value}%`;
        },
      },
    },
  };

  const incomeOptions = {
    series: [
      {
        name: "Income",
        data: incomeExpenseData.six.income,
      },
      {
        name: "Expenses",
        data: incomeExpenseData.six.expenses,
      },
    ],
    chart: {
      type: "bar",
      height: 370,
      toolbar: { show: false },
    },
    colors: ["#16a34a", "#ef4444"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "36%",
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: "#dce5f2",
    },
    xaxis: {
      categories: incomeExpenseData.six.labels,
      axisBorder: { color: "#cbd5e1" },
      axisTicks: { show: false },
      labels: {
        style: { colors: "#65758f", fontSize: "14px" },
      },
    },
    yaxis: {
      min: 0,
      max: 9000,
      tickAmount: 9,
      labels: {
        style: { colors: "#65758f", fontSize: "14px" },
        formatter(value) {
          return `$${Math.round(value / 1000)}k`;
        },
      },
    },
    legend: {
      position: "bottom",
      fontSize: "16px",
      labels: { colors: "#64748b" },
      markers: { width: 14, height: 14, radius: 999 },
    },
    tooltip: {
      y: {
        formatter(value) {
          return formatCurrency(value);
        },
      },
    },
  };

  categoryChart = new ApexCharts(document.querySelector("#categoryChart"), categoryOptions);
  incomeExpenseChart = new ApexCharts(document.querySelector("#incomeExpenseChart"), incomeOptions);

  categoryChart.render();
  incomeExpenseChart.render();
  analyticsChartsReady = true;
}

function bindSpendingRangeButtons() {
  spendingRangeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const range = button.dataset.spendingRange;
      spendingRangeButtons.forEach((btn) => {
        const isActive = btn === button;
        btn.classList.toggle("btn-primary-subtle", isActive);
        btn.classList.toggle("text-primary", isActive);
        btn.classList.toggle("btn-link", !isActive);
        btn.classList.toggle("text-secondary", !isActive);
      });

      spendingChart.updateOptions({
        xaxis: { categories: spendingActivityData[range].categories },
      });
      spendingChart.updateSeries([
        { name: "Spent", data: spendingActivityData[range].values },
      ]);
    });
  });
}

function bindAnalyticsButtons() {
  incomeRangeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const range = button.dataset.incomeRange;
      incomeRangeButtons.forEach((btn) =>
        btn.classList.toggle("active", btn === button),
      );
      initAnalyticsCharts();
      incomeExpenseChart.updateOptions({
        xaxis: { categories: incomeExpenseData[range].labels },
      });
      incomeExpenseChart.updateSeries([
        { name: "Income", data: incomeExpenseData[range].income },
        { name: "Expenses", data: incomeExpenseData[range].expenses },
      ]);
    });
  });
}

// ======================== CARDS ========================
function renderCard() {
  const card = userCards[activeCardIndex];

  cardBalance.textContent = formatCurrency(card.balance, {
    minimumFractionDigits: 2,
  });
  cardNumber.textContent = `**** **** **** ${card.number}`;
  cardExpiry.textContent = card.expiry;
  detailNumber.textContent = `**** ${card.number}`;
  detailExpiry.textContent = card.expiry;
  detailStatus.textContent = card.status;
  detailStatus.classList.toggle("frozen", card.status === "Frozen");
  freezeToggle.checked = card.status === "Frozen";

  cardDots.innerHTML = userCards
    .map(
      (_, index) =>
        `<span class="card-dot ${index === activeCardIndex ? "active" : ""}"></span>`,
    )
    .join("");
}

function bindCardButtons() {
  document.getElementById("prevCardBtn").addEventListener("click", () => {
    activeCardIndex = (activeCardIndex - 1 + userCards.length) % userCards.length;
    renderCard();
  });

  document.getElementById("nextCardBtn").addEventListener("click", () => {
    activeCardIndex = (activeCardIndex + 1) % userCards.length;
    renderCard();
  });

  document.getElementById("addCardBtn").addEventListener("click", () => {
    alert("Add Card button clicked");
  });

  freezeToggle.addEventListener("change", (event) => {
    const status = event.target.checked ? "Frozen" : "Active";
    userCards[activeCardIndex].status = status;
    detailStatus.textContent = status;
    detailStatus.classList.toggle("frozen", event.target.checked);
  });

  limitSlider.addEventListener("input", () => {
    limitValue.textContent = formatCurrency(Number(limitSlider.value));
  });
}

// ======================== SETTINGS ========================
function bindSettingsButtons() {
  document.getElementById("editProfileBtn").addEventListener("click", () => {
    alert("Edit Profile button clicked");
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    alert("Log Out button clicked");
  });

  darkModeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode", darkModeToggle.checked);
  });
}

function bindUpgradeButton() {
  upgradeBtn.addEventListener("click", () => {
    alert("Upgrade to Pro clicked");
  });
}

// ======================== SEARCH ========================
function search(e) {
  const searchText = e.value || "";
  renderTransactions(currentFilter, searchText);
}

// ======================== INITIALIZATION ========================
setActiveNav();
bindFilters();
bindSpendingRangeButtons();
bindAnalyticsButtons();
bindCardButtons();
bindSettingsButtons();
bindUpgradeButton();
renderTransactions("all");
renderCategories();
renderBudgets();
renderSubscriptions();
renderCard();
initChart();
