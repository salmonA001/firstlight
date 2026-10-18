# Firstlight

A 3D sandbox where you watch AI nations grow their own civilization. People gather, farm and build; tribes form, trade, found faiths, invent technology, raise wonders and go to war on land and sea. Each nation has its own council AI that picks a strategy every year and learns from how it went.

## Play

Open `index.html` in a browser. Three.js loads from a CDN, so there's no build step.

- Choose a starting era from the Stone Age up to the 2000s
- Speed controls, a Chronicle history log, and population and nations charts
- World tools: meteor, quake, plague, wildfire, drought, harvest, newcomers
- Armies that muster, march in formation, fight named battles and besiege towns
- Each culture builds its own walls, plus granaries, markets, barracks, libraries and more
- Save your world in the browser and load it later

## Tests

The simulation lives in `<script id="sim-core">` and has no DOM dependency, so it runs headless in Node:

```
node tests/run.js [era] [seed] [years]   # run a world and print stats
node tests/ai.js                         # council AI strategies
node tests/nudge.js                      # world tools
node tests/save.js                       # save/load round trip
node tests/army.js                       # armies, battles and sieges in four eras
```
