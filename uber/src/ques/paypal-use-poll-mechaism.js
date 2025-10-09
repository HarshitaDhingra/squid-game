// There are 3 microservices - A, B and C located in different geography with different SLAs.
// call-api-until-request-marked-as-completedd

const services = [
  { name: "A", url: "exampleA.com/status", sla: 5000 },
  { name: "B", url: "exampleB.com/status", sla: 7000 },
  { name: "C", url: "exampleC.com/status", sla: 9000 },
];

// Build a monitoring system which displays the availability status like a "Traffic signal" using JavaScript.
// - show GREEN, if it is available.
// - show RED, if a service is down or on Error.
// - show YELLOW, if the request for checking availability goes over SLA.

// ## requirement:
// - retry the `YELLOW` ones twice before eventually marking it as `RED`
// - suggest the polling frequency for us to check the availability and retries.
// - console.log() the results periodically with timestamps

// eg:
// hh:mm:ss
// 11:00:00 -> 1st iteration (A is available, B is erroring out, C is unreachable)
// <?> : a: GREEN, b: RED, c: YELLOW // 1st attempt
// <?> :     <same>        c: YELLOW // 2nd attempt
// <?> : a: GREEN, b: RED, c: RED // console.log the result
// <?>  : -> 2nd iteration?
// 11:<?>:<?>-> 1st iteration (A is available, B is erroring out, C is unreachable)

// 11:00:00 // A first req
// 11:00:10 // A 2nd req yellow
// 11:00:15 // A 3rd req yellow and you mark it as red

const maxTries = 2;

async function checkPoll(service, retries) { 
  const start = Date.now();

  try {
    const res = await fetch(service.url);
    const duration = Date.now() - start;

    if (res.status >= 500) {
      return { name: service.name, status: "RED" };
    }

    if (duration <= service.sla) {
      return { name: service.name, status: "GREEN" };
    } else {
      if (retries < maxTries) {
        console.log(
          `${new Date().toLocaleTimeString()} :: ${
            service.name
          } => YELLOW (retry ${retries + 1})`
        );
        await new Promise((r) => setTimeout(r, service.sla));
        return await checkPoll(service, retries + 1);
      }
      return { name: service.name, status: "RED" };
    }
  } catch {
    return { name: service.name, status: "RED" };
  }
}

async function callPolls() {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`\n${timestamp} -> New Iteration`);

  const pollPromises = services.map((s) => checkPoll(s, 0));

  const results = await Promise.allSettled(pollPromises);

  results.forEach((res, i) => {
    if (res.status === "fulfilled") {
      console.log(`${services[i].name} : ${res.value.status}`);
    } else {
      console.log(`${services[i].name} : ERROR`);
    }
  });
}

// Example: poll every 30s
setInterval(callPolls, 30000);
