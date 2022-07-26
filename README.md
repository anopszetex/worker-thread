# worker-thread
How editing images using multi thread with nodejs

## 🚀 Project Setup

To install dependencies, run the following commands:

> Clone repo 
```
git clone https://github.com/anopszetex/worker-thread.git
```

> Install dependencies
```
npm install 
```
or
```
npm ci
```
## Let's start. First run:

```sh
# we use ntl to interactive to package.json scripts
ntl

# if you are using "oh my zsh"
yarn ntl
```

You should choose the "dev"

![image](https://user-images.githubusercontent.com/31970167/181119551-8e0755fe-8055-478e-9cbd-4ba97ce3cc22.png)


In sequence run sh:
```sh
sh run.sh
```
You can access it here too: [localhost](http://localhost:3712/joinImages?image=https://wallpapercave.com/wp/wp2482763.png&background=https://wallpapercave.com/wp/wp2482763.png)

You can ignore run.sh and execute autocannon directly. We use `autocannon` for benchmarking.
In a separate terminal with server running, run autocannon:
```sh
npm run autocannon
```
You should see results similar to:
```
Running 30 test @ http://localhost:3712/joinImages?
image=https://wallpapercave.com/wp/wp2482763.png&
background=https://wallpapercave.com/wp/wp2482763.png
100 connections

┌─────────┬────────┬────────┬────────┬────────┬──────────┬─────────┬───────────┐
│ Stat    │ 2.5%   │ 50%    │ 97.5%  │ 99%    │ Avg      │ Stdev   │ Max       │
├─────────┼────────┼────────┼────────┼────────┼──────────┼─────────┼───────────┤
│ Latency │ 100 ms │ 101 ms │ 104 ms │ 125 ms │ 101.2 ms │ 3.09 ms │ 130.66 ms │
└─────────┴────────┴────────┴────────┴────────┴──────────┴─────────┴───────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬───────┬───────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg   │ Stdev │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼───────┼───────┼─────────┤
│ Req/Sec   │ 90      │ 90      │ 99      │ 100     │ 97.8  │ 3.32  │ 90      │
├───────────┼─────────┼─────────┼─────────┼─────────┼───────┼───────┼─────────┤
│ Bytes/Sec │ 14.8 kB │ 14.8 kB │ 16.2 kB │ 16.4 kB │ 16 kB │ 545 B │ 14.8 kB │
└───────────┴─────────┴─────────┴─────────┴─────────┴───────┴───────┴─────────┘
```

You also should monitor the application using compositon between flame 0x and autocannon.
Instead of starting our server with the node binary, we use 0x executable.

We start our server with the following command:
```sh
npm run flame-0x
```

In another terminal window we use autocannon to generate load:
```sh
npm run autocannon
```

The 0x tool has created a folder named profile-XXXX, where XXXX is the PID of the server process.

If we open the flamegraph.html file with Google Chrome we'll be presented with some controls, and a flamegraph resembling the following:

![image](https://user-images.githubusercontent.com/31970167/181130193-405dc4cd-0438-4f95-aaa1-910bf43f0797.png)
