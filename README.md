popcorntime-smarttv
===================

Version of [Popcorntime](https://github.com/popcorn-official/popcorn-app) for Samsung SmartTv

This app now depends of [Popcorntime-smarttv-server](https://github.com/raphaelluchini/popcorntime-smarttv-server)

#Scope
For the best UX and performace for smartvs we need a very organized and clean code, using some tools and making some code refactors, we are be able to push this app foward pretty fast! That's why I'm not responding the issues for while, Sorry!

#Notes
- For better issue tracker, docs, and fast development, I've moved the node server(core) to another repository, so now we have separated projects. Any problem about the server, goto: [Popcorntime-smarttv-server page](https://github.com/raphaelluchini/popcorntime-smarttv-server)
- New Frontend code refactored comming soon! Please, wait the next version for bugs reports!
- Any suggestion, feel free to ask me!

#Getting Started

- [How to Install on my TV](https://www.samsungdforum.com/Guide/art00013/index.html#packaging-applications-for-upload)
- [What year is my TV?](http://www.samsung.com/us/support/faq/FAQ00057975/76904/LN46B540P8FXZA)
- [My TV support this app?](http://developer.samsung.com/devices/tv-specs#)(This App uses 3.5 SDK)

## How to use Popcorntime Server

- Do you will need npm and grunt-cli installed in your computer
- run ``npm install``
- Set your [server](https://github.com/raphaelluchini/popcorntime-smarttv-server) ip in PlayerManager.js
- run ``grunt``
- Start your server
- Deploy your app on your TV and run :)

#Dev TODOS

- Better documentation for deploy/test/run
- Server code refactor
- Add i8n support(Done)
- Add Subtitles
- Performace improvements
- Auto/Manual node server selector using UI elements
- Popcorntime code refactor(Soon)
- Popcorntime bugfixes
- Add back button
- Remove animations
