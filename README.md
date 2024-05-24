# RedBadger
An experimental C2 server


## BadgerServer
The server is written in golang to allow for quick and reliable interaction between
the control clients & the implants.

> ### Why was Go used for the Command Server?
>
> Go excels in processes involving networking & overall server operations and
> with the hope of faster iteration on server led to this decision.

## badger_client
The badger client is the tool used to interact with the Badger Server (C2 server).

> ### Why was Rust used for the client?
>
> The Rust ecosystem provides better tooling when it comes to creating user interfaces.
> Since the client doesn't do a significant amount of networking & data management compared
> to the server, Rust seemed like the best candidate.