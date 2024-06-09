<script lang="ts">
    import { Router, Link, Route } from "svelte-routing";
    import Login from "./Login.svelte";
    import Test from "./Test.svelte";
    import Dashboard from "./Dashboard.svelte";

    export let url = "";
</script>

<Router {url}>
    <div>
        <Route path="/login" component={Login} />
        <Route path="/test" component={Test} />
        <Route path="/dashboard" component={Dashboard} />
    </div>
</Router>

<style>
</style>
