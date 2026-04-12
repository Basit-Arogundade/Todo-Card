const due = new Date("2026-04-16 23:59:59");

function updateTime() {
    const now = new Date();
    const diff = due - now;
    
    const dueDateEl = document.getElementById("dueDate");
    const timeEl = document.getElementById("timeRemaining");

    dueDateEl.textContent = "Due: " + due.toDateString();

    if (diff <= 0){
        timeEl.textContent = "Task overdue";
        return;
    }

    const days = Math.floor(diff/(1000*60*60*24));
    const hours = Math.floor((diff/(1000*60*60))%24);
    const min = Math.floor((diff/(1000*60))%60);

    timeEl.textContent = `Due in ${days}d ${hours}h, ${min}min`;
}
updateTime();
setInterval(updateTime, 60000);