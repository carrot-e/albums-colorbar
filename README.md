# FINN Music

> Demo: https://proud-water-6969.fly.dev/

<img width="1185" alt="image" src="https://user-images.githubusercontent.com/5543497/202926314-3ce5278e-bdf2-4af7-aa5f-efbaa2882433.png">

## Technical stack
* Typescript
* React
* Tailwind
* Jest
* ESLint
* Prettier

## How to
To launch app in local env:
```
npm run i
npm run start
```

To run tests:
```
npm run test
```

To run linter:
```
npm run lint
```

## Features
This is a single page application, consisting of a searchable list of iTunes' top albums.
There are 2 list views: grid and color scale. 
* In grid view albums are sorted in ranking order (according to iTunes data).
  <img width="836" alt="image" src="https://user-images.githubusercontent.com/5543497/202927028-38ee4006-46bc-4b90-a6b6-5af9c36505e7.png">
* In color scale view albums are sorted by the predominant color of the album cover image.
  <img width="841" alt="image" src="https://user-images.githubusercontent.com/5543497/202927050-7f9b963a-6de1-45ca-86a9-5e21744b1ff8.png">

User can casually scroll through albums or check album details, presented in a sidebar.
In the sidebar user will also find a direct link to iTunes.
<img width="497" alt="image" src="https://user-images.githubusercontent.com/5543497/202927100-a0290922-ecee-4265-9277-5f1049768c6c.png">


## Details: Color scale
1. Defining the dominant color of an album is done by:
   1. Retrieving the predominant color by https://www.npmjs.com/package/color-thief-react
   2. Normalizing the color. All colors are aligned in saturation & brightness to allow organizing covers in 1D space.
2. User may switch between modes using the switcher at the top of the page
3. In color scale mode the page layout is updated based on user mouse interaction wih the albums list.

## Afterthoughts
There's of course always a room for improvement.
For this project the test coverage could be improved.
Another thing worth considering is mobile experience of color scale mode.
