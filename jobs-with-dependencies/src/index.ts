import "./styles.css";

class Job {
  constructor(name) {
    this.name = name;
    this.upJobs = [];
    this.downJob = null;
  }
  registerUp(job) {
    this.upJobs.push(job);
    job.downJob = this;
  }
  run(job) {
    const jobId = this.upJobs.push(job);
    this.upJobs.splice(jobId, 1);
    if(this.upJobs.length == 0){

    }
  }
}
