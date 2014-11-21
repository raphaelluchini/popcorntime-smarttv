popcorntime-smarttv
===================

Version of [Popcorntime](https://github.com/popcorn-official/popcorn-app) for Samsung SmartTv

This app now depends of [Popcorntime-smarttv-server](https://github.com/raphaelluchini/popcorntime-smarttv-server)

#Getting Started

- [How to Install on my TV](https://www.samsungdforum.com/Guide/art00013/index.html#packaging-applications-for-upload)
- [What year is my TV?](http://www.samsung.com/us/support/faq/FAQ00057975/76904/LN46B540P8FXZA)
- [My TV support this app?](http://developer.samsung.com/devices/tv-specs#)(This App uses 3.5 SDK)

## How to deploy your Popcorntime

- Do you will need [nodejs](http://nodejs.org/), [npm](http://blog.npmjs.org/post/85484771375/how-to-install-npm) and [grunt-cli](http://gruntjs.com/getting-started) installed in your computer
- run ``npm install``
- run ``grunt``
- then run ``grunt deploy``
- If you see this message: "Please go to http://xxx.xxx.xxx.xxx to test your popcorntime server." Worked!
- Set your network ip into the TV (The same ip returned to you above)
- Your tv going to download your app
- Start your [popcorntime-smarttv-server](https://github.com/raphaelluchini/popcorntime-smarttv-server)
- Open your TV app

#Roadmap

- Better documentation for deploy/test/run(Done)
- Add i18n support(Done)
- Popcorntime code refactor(Done)
- Create an branch for a compiled version(Soon)
- Server code refactor
- Add Subtitles
- Performace improvements
- Auto/Manual node server selector using UI elements
- Popcorntime bugfixes
- Add back button
- Remove animations
