# Show Case
Show Case is front-end 'All-in-one' solution.

### First aim:
> It works for all UI frameworks(Reactjs, Vuejs, angular etc., now React+antd is online).

### Second aim:(next version: 1.1.0)
> Just tell the module and business proccess from the UI, so that let front-end teams work parallelly(one guy solve the data proccess, one guy solve the UI matter)

### Third aim:
> All platforms(pc, mobile, desktop, app) support, base on the above two aims: the only thing thing we achieve the goal is write different UI for diffrent platforms.

# Folder structure 

### build
> It contains all the configures to build release code and run dev code.

### comps
> It contains all the common components for the project.

### dist
> It contains release code.

### moudles
> It contains all the data structure for the project(like the Person)

### src 
> It contains project source code
#### src/i18n
support multiple languages

#### src/service
api request url

#### src/page
it contains all the pages of the project

### test
> It contains Unit test for api

### utils
> It contans common functions for the project(like remote request, get, put, remove, post)

# How to play
1. clone the this repository
```
git clone https://github.com/seenyea/showcase.git
```

2. install the project dependencies
```
npm i
```

3. run the dev
```
npm run dev
```

4. build the release code
```
npm run build
```

# common error