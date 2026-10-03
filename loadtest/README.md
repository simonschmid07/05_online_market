# Load test

Test plan: `online-market-load-test.jmx` (Apache JMeter 5.6.3)

| Setting | Value |
|---|---|
| Target | `GET http://localhost:8080/api/items` (product list through the Nginx proxy) |
| Users | 10 (maximum allowed) |
| Ramp-up | 10 seconds |
| Loops per user | 30 (300 requests in total) |
| Think time | 300 ms |
| Assertion | HTTP status code 200 |

## Run

```bash
docker compose up -d --build
jmeter -n -t loadtest/online-market-load-test.jmx -l loadtest/results/results.jtl -e -o loadtest/results/report
```

`-e -o` needs an empty or non-existing output folder. Delete `loadtest/results/report` before a new run.

## Results

See `results/` (results.jtl, HTML report, screenshots).

## Analysis

(Add after the test: average, median, 95% line, error % and conclusion.)