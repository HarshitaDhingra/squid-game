// import "./styles.css";

// task scheduling

const schedules = [
  { id: "a", dependencies: ["b", "c"] },
  { id: "b", dependencies: ["d"] },
  { id: "c", dependencies: ["e"] },
  { id: "d", dependencies: [] },
  { id: "e", dependencies: ["f"] }, // try with c
  { id: "f", dependencies: [] },
];

const totalTasks = schedules.length;
let totalTasksExecuted = 0;
let currentTask = 0;

const removeTaskFromDeps = (id) => {
  schedules.forEach((task) => {
    const index = task.dependencies.indexOf(id);
    if (index !== -1) task.dependencies.splice(index, 1);
  });
};

const executeTasks = () => {
  while (totalTasksExecuted < totalTasks) {
    const task = schedules[currentTask];
    if (!task.dependencies.length && !task.executed) {
      console.log(task.id);
      task.executed = true;
      totalTasksExecuted += 1;
      b;
      removeTaskFromDeps(task.id);
    } else if (!task.dependencies.length) {
      if (!task.visited) task.visited = 1;
      else task.visited += 1;

      if (task.visited > totalTasks) {
        console.log("Cycle formed");
        break;
      }
    }
    currentTask = (currentTask + 1) % totalTasks;
    // if (currentTask === totalTasks - 1) currentTask = 0;
    // else currentTask += 1;
  }
};
executeTasks();

// class Job {
//   constructor(name) {
//     this.name = name; // like a
//     this.dependencies = []; // like []
//     this.factorFor = null; // like d
//   }
//   createDependency(job) {
//     this.dependencies.push(job);
//     job.factorFor = this;
//   }
//   run(job) {
//     const jobId = this.dependencies.indexOf(job);
//     this.dependencies.splice(jobId, 1);

//     if (!this.dependencies.length) {
//       console.log("Job completed: ", this.name);
//       if (this.factorFor) {
//         this.factorFor.run(this);
//       } else {
//         console.log("Jobs Complete!");
//       }
//     }
//   }
// }
// const a = new Job("A");
// const b = new Job("B");
// const c = new Job("C");
// const d = new Job("D");
// const e = new Job("E");

// d.createDependency(a);
// d.createDependency(b);
// e.createDependency(d);
// e.createDependency(c);

// a.run();
// b.run();
// c.run();
