
var players = [];

var current_player = null;
var playCount = 0;

var ticket = [...Array(100).keys()];
var win_ticket_id = -1;
var bonus_tickets = [];

function undisplayStartMenu() {
    let start_menu = document.getElementById("start_menu");
    start_menu.classList.add("hidden");
}

function displayWheel() {
    let wheel_menu = document.getElementById("wheel_menu");
    wheel_menu.style.visibility = "visible";
}

function unDisplayWheel() {
    let wheel_menu = document.getElementById("wheel_menu");
    start_menu.classList.add("hidden");
}

function chooseRandomPlayer() {
    return players[Math.floor(Math.random()*players.length)];
}

function spinWheel() {
    let wheel = document.getElementById("wheel");
    let wheel_value = Math.floor(Math.random()*100);
    wheel.style.transform = "rotate(" + wheel_value + "deg)";
    return wheel_value;
}

function playTicket(ticket_id) {
    if(ticket_id == win_ticket_id) {
        endGame(ticket_id);
    }
    else if(bonus_tickets.includes(ticket_id)) {
        bonusTicket(ticket_id);
    }
    else {
        missTicket(ticket_id);
        playCount -= 1;
    }
}

function bonusTicket(ticket_id) {
    let bonus_ticket = document.getElementById("ticket_" + ticket_id);
    bonus_ticket.classList.add("ticket_bonus");
}

function missTicket(ticket_id) {
    let miss_ticket = document.getElementById("ticket_" + ticket_id);
    miss_ticket.classList.add("ticket_miss");
    // Wrong effect / vibration on the ticket
}

function endGame(ticket_id) {
    let ticket_win = document.getElementById("ticket_" + ticket_id);
    ticket_win.classList.add("ticket_win");
    // Wait 5 seconds
    setTimeout(displayEndMenu, 3000);
}

function displayEndMenu() {
    //let end_menu = document.getElementById("end_menu");
    //start_menu.style.display = "block";
    //alert("bob");
}

function startGame() {

    let win_input = document.getElementById("win_input");
    if(win_input.value == "") return;
    if(win_input.value > 100) return;
    if(win_input.value < 1) return;

    win_ticket_id = win_input.value-1;

    undisplayStartMenu();
}

function addBonus() {

    let bonus_input = document.getElementById("bonus_input");

    if(bonus_input.value == "") return;
    if(win_input.value > 100) return;
    if(win_input.value < 1) return;

    let bonus_value = bonus_input.value;
    bonus_tickets.push(bonus_value-1);
    bonus_input.value = "";

    let bonuses = document.getElementById("bonuses");
    let bonus = document.createElement("div");
    bonus.id = "bonus_" + bonus_value;
    bonus.classList.add("row");
    bonus.classList.add("gap-12");
    bonus.classList.add("w-100");

    let bonus_info = document.createElement("span");
    let bonus_button = document.createElement("span");
    bonus_info.classList.add("bonuses_item");
    bonus_info.innerHTML = bonus_value;
    bonus_button.classList.add("button");
    bonus_button.classList.add("add_bonus");
    bonus_button.classList.add("remove_button");
    bonus_button.innerHTML = "-";
    bonus_button.onclick = function() {removeBonus(bonus_value-1)};

    bonus.appendChild(bonus_info);
    bonus.appendChild(bonus_button);
    bonuses.appendChild(bonus);

}

function removeBonus(bonus_id) {
    bonus_tickets.splice(bonus_id-1, 1);
    let bonus = document.getElementById("bonus_" + bonus_id);
    bonus.remove();
}