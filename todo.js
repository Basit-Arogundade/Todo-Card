let due = new Date("2026-04-16T23:59");


const dueDateEl = document.getElementById("dueDate");
const timeEl = document.getElementById("timeRemaining");
const overdueEl = document.querySelector('[data-testid="test-todo-overdue-indicator"]');

const statusControl = document.querySelector('[data-testid="test-todo-status-control"]');
const statusEl = document.getElementById("Status");
const checkbox = document.getElementById("checkbox");

const descSection = document.getElementById("descSection");
const expandBtn = document.querySelector('[data-testid="test-todo-expand-toggle"]');

const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
const editForm = document.querySelector('[data-testid="test-todo-edit-form"]');

const titleEl = document.querySelector('[data-testid="test-todo-title"]');
const descEl = document.querySelector('[data-testid="test-todo-description"]');
const priorityEl = document.querySelector('[data-testid="test-todo-priority"]');

const editTitle = document.querySelector('[data-testid="test-todo-edit-title-input"]');
const editDesc = document.querySelector('[data-testid="test-todo-edit-description-input"]');
const editPriority = document.querySelector('[data-testid="test-todo-edit-priority-select"]');
const editDate = document.querySelector('[data-testid="test-todo-edit-due-date-input"]');

const saveBtn = document.querySelector('[data-testid="test-todo-save-button"]');
const cancelBtn = document.querySelector('[data-testid="test-todo-cancel-button"]');

const priorityIndicator = document.querySelector('[data-testid="test-todo-priority-indicator"]');

let oldData = {};

function updateTime() {
  const now = new Date();

  // DONE STATE
  if (statusControl.value === "Done") {
    timeEl.textContent = "Completed";
    overdueEl.classList.add("hidden");
    return;
  }

  const diff = due - now;

  // OVERDUE
  if (diff <= 0) {
    const overdueMs = Math.abs(diff);

    const hours = Math.floor(overdueMs / (1000 * 60 * 60));
    const mins = Math.floor((overdueMs / (1000 * 60)) % 60);

    overdueEl.classList.remove("hidden");
    overdueEl.textContent = "Overdue";


        if (hours > 0) {
            timeEl.textContent = `Overdue by ${hours}h ${mins}m`;
          }  else {
            timeEl.textContent = `Overdue by ${mins} minutes`;
          }

    return;
  }

  // NORMAL
  overdueEl.classList.add("hidden");

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);

  if (days > 0) {
    timeEl.textContent = `Due in ${days} day${days > 1 ? "s" : ""}`;
  } else if (hours > 0) {
    timeEl.textContent = `Due in ${hours} hour${hours > 1 ? "s" : ""}`;
  } else {
    timeEl.textContent = `Due in ${mins} minute${mins > 1 ? "s" : ""}`;
  }

  dueDateEl.textContent = "Due: " + due.toDateString();
}

statusControl.onchange = () => {
  statusEl.textContent = statusControl.value;

  checkbox.checked = statusControl.value === "Done";

  updateTime();
};

checkbox.onchange = () => {
  if (checkbox.checked) {
    statusControl.value = "Done";
  } else {
    statusControl.value = "Pending";
  }

  statusEl.textContent = statusControl.value;

  updateTime();
};

function updatePriorityUI(priority) {
  priorityIndicator.className = "";

  if (priority === "Low") priorityIndicator.classList.add("low");
  if (priority === "Medium") priorityIndicator.classList.add("medium");
  if (priority === "High") priorityIndicator.classList.add("high");
}

expandBtn.onclick = () => {
  const isExpanded = descSection.classList.contains("desc");

  if (isExpanded) {
    descSection.classList.remove("desc");
    descSection.classList.add("collapsed");

    expandBtn.textContent = "Show more";
    expandBtn.setAttribute("aria-expanded", "false");
  } else {
    descSection.classList.add("desc");
    descSection.classList.remove("collapsed");

    expandBtn.textContent = "Show less";
    expandBtn.setAttribute("aria-expanded", "true");
  }
};

function checkOverflow() {
  const collapsedHeight = 50;

  descSection.classList.add("desc");
  descSection.classList.remove("collapsed");

  const fullHeight = descSection.scrollHeight;

  descSection.classList.remove("desc");
  descSection.classList.add("collapsed");

  if (fullHeight <= collapsedHeight) {
    expandBtn.classList.add("hidden");
  } else {
    expandBtn.classList.remove("hidden");
  }
}

editBtn.onclick = () => {
  oldData = {
    title: titleEl.textContent,
    desc: descEl.textContent,
    priority: priorityEl.textContent,
    due: due
  };

  editTitle.value = oldData.title;
  editDesc.value = oldData.desc;
  editPriority.value = oldData.priority;
  editDate.value = due.toISOString().slice(0, 16);

  editForm.classList.remove("hidden");
};

saveBtn.onclick = () => {
  titleEl.textContent = editTitle.value;
  descEl.textContent = editDesc.value;
  priorityEl.textContent = editPriority.value;

  due = new Date(editDate.value);

  descSection.classList.remove("desc");
  descSection.classList.add("collapsed");

  expandBtn.textContent = "Show more";
  expandBtn.setAttribute("aria-expanded", "false");

  updatePriorityUI(editPriority.value);
  checkOverflow();
  updateTime();

  editForm.classList.add("hidden");
};

cancelBtn.onclick = () => {
  titleEl.textContent = oldData.title;
  descEl.textContent = oldData.desc;
  priorityEl.textContent = oldData.priority;
  due = oldData.due;

  editForm.classList.add("hidden");
};

updatePriorityUI(priorityEl.textContent);
updateTime();
setInterval(updateTime, 60000);
window.onload = checkOverflow;


