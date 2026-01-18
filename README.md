# Taskflow ⏱️

**Taskflow** is a lightweight, time-aware task manager built with vanilla JavaScript.  
It helps you organize your daily tasks by execution time, track progress, and stay focused - without unnecessary complexity.

> Time-aware tasks. Clear daily focus.

---

##  Inspiration

Taskflow was born out of a personal productivity challenge.

I often started my day with a list of tasks, but as the day progressed:
- deadlines were missed,
- priorities became unclear,
- and tasks felt scattered rather than structured.

I wanted a simple system that didn’t just **store tasks**, but helped me **flow through them in the right order** - based on time and completion status.  
That idea became **Taskflow**.

---

##  Features

- **Time-based tasks**  
  Assign a specific time to a task and visually track what needs to be done next.

- **Overdue detection**  
  Tasks automatically highlight when their scheduled time has passed.

- **Smart sorting**  
  Tasks are dynamically ordered by time, with untimed tasks placed at the end.

- **Task filters**  
  View tasks by:
  - All
  - Active
  - Completed

- **Persistent storage**  
  Tasks are saved in `localStorage` - refresh or close the browser without losing data.

- **Minimal & responsive UI**  
  Clean dark theme, smooth animations, and mobile-friendly layout.

- **Efficient event handling**  
  Uses event delegation for performance and clean DOM management.

---

##  Technical Highlights

- State-driven architecture (single source of truth)
- Derived UI rendering (`state → render`)
- Immutable patterns (`slice`, `filter`)
- Event delegation instead of per-element listeners
- Time comparison logic using native `Date`
- No frameworks - pure HTML, CSS, and JavaScript

This project reflects concepts that directly translate to **React / React Native**, such as:
- state management
- derived views
- unidirectional data flow

---

##  Tech Stack

- **HTML5**
- **CSS3** (CSS variables, responsive design)
- **JavaScript (ES6+)**
- **LocalStorage API**

---

##  Preview

> <img src="TaskFlow.png">

---
##  Demo
Try this out: https://sagarpani.github.io/TaskFlow

---

## Project Structure

Taskflow/<br>
├── index.html<br>
├── index.css<br>
├── index.js<br>
└── README.md

---

## How to Run Locally

### 1. Clone the repository

git clone https://github.com/your-username/taskflow.git


### 2. Open index.html in your browser
(No build tools or dependencies required)

---

## Future Improvements

=> Keyboard shortcuts (Enter to add, Esc to clear)

=> Real-time overdue updates (time ticking)

=> Date-based tasks (beyond same-day scope)

=> React / React Native version (Expo)

=> Cloud sync instead of localStorage

---

## Author

Sagar Pani<br>
Frontend & Mobile App Developer (in progress)<br>
Learning React Native, Expo, and modern JavaScript architecture.

Building projects to learn deeply, not just to make them work.<br>
LinkedIn: https://www.linkedin.com/in/sagarpani

## License

This project is open-source and available under the MIT License.