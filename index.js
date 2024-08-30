function findTravelRoute(startCity, citiesVisited, tickets) {
    // Step 1: Construct the graph from the tickets
    const graph = {};
    tickets.forEach(([start, end]) => {
        if (!graph[start]) {
            graph[start] = [];
        }
        graph[start].push(end);
    });

    // Step 2: DFS to build the route
    const route = [];
    const visited = new Set();

    function dfs(city) {
        // Add the city to the route
        route.push(city);
        visited.add(city);

        // If all cities have been visited, return true
        if (route.length === citiesVisited.length) {
            return true;
        }

        // Explore neighboring cities
        if (graph[city]) {
            for (let nextCity of graph[city]) {
                if (!visited.has(nextCity)) {
                    if (dfs(nextCity)) {
                        return true;
                    }
                }
            }
        }

        // Backtrack if the route is not valid
        route.pop();
        visited.delete(city);
        return false;
    }

    // Start DFS from the initial city
    dfs(startCity);

    return route;
}

// Example input
const startCity = "Kiev";
const citiesVisited = ["Amsterdam", "Kiev", "Zurich", "Prague", "Berlin", "Barcelona"];
const tickets = [
    ["Paris", "Skopje"],
    ["Zurich", "Amsterdam"],
    ["Prague", "Zurich"],
    ["Barcelona", "Berlin"],
    ["Kiev", "Prague"],
    ["Skopje", "Paris"],
    ["Amsterdam", "Barcelona"],
    ["Berlin", "Kiev"],
    ["Berlin", "Amsterdam"]
];

// Find the route
const route = findTravelRoute(startCity, citiesVisited, tickets);
console.log("The route your son traveled:", route.join(" -> "));
