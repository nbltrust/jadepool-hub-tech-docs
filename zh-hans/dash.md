# dash

## Getting Started

## Requirements

- ubuntu16.04+
- nodejs v8
- 2 Core CPU or above
- 8G Memory or above
- 500G Storage or above
- 10Mbit/s bandwidth or above
- NTP service on

##Install
npm install -g @dashevo/dashcore-node
dashcore-node create mynode
cd mynode
dashcore-node install @dashevo/insight-api
dashcore-node start  # to also start the service


##Query Rate Limit
To protect the server, insight-api has a built-in query rate limiter. It can be configurable in dashcore-node.json with:
```json
"servicesConfig": {
  "insight-api": {
    "rateLimiterOptions": {
      "whitelist": ["::ffff:127.0.0.1"]
    }
  }
}
```
With all the configuration options available: https://github.com/dashevo/insight-api/blob/master/lib/ratelimiter.js#L10-17

Or disabled entirely with:
```json
"servicesConfig": {
  "insight-api": {
    "disableRateLimiter": true
  }
}
```
## Start dashcore-node

```sh
nohup dashcore-node start  > dashcore-node.log 2>&1 &
```