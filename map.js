
'use strict'        // let the browser know we're serious


console.log('Loaded map.js')

// your mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoidHJlZWZhbGxkb3duIiwiYSI6ImNrYmlwNWkzaDBmYmgyeWswcTVsa3ZvMmUifQ.K98vl28x9Km5pWBpKL_opQ'


let map = new mapboxgl.Map({
  container: 'map',


 style: 'mapbox://styles/brianhouse/cjn0u552b52kr2spdz6yhpqj4',
  center: [-75.228101, 43.098369],
  zoom: 6,
  pitch: 0


})


let navigation = new mapboxgl.NavigationControl({
  showCompass: false
})

map.addControl(navigation, 'top-left')


let scale = new mapboxgl.ScaleControl({
  maxWidth: 80,
  unit: 'imperial'
})


map.addControl(scale, 'bottom-right')

let geolocate = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true,
  showUserLocation: true,
  fitBoundsOptions: {
  }
})

map.addControl(geolocate, 'top-left')

// this is an event handler
geolocate.on('geolocate', function(event) {
  // console.log(event.coords)

  // create new variables to store the attributes we're interested in from the event
  let lng = event.coords.longitude
  let lat = event.coords.latitude

  // debug
  console.log('geolocated:', lng, lat)

  // format lng lat values and display them on our 'info' element
  document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)

})

map.on('click', function(event) {

  let lng = event.lngLat.lng
  let lat = event.lngLat.lat

  console.log("clicked:", lng, lat)

  document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)

})


let data = [

  {
    location: [-73.689848,42.7252879],
    content: 'I got my first tattoo here!<br /><img src="libraries/bee.jpg" />'
      },
 {
    location: [-78.877023,42.9219655],
    content: 'I got a Friday the 13th b-day tattoo here!<br /><img src="libraries/ghost.jpg" />'
  },
  {
    location: [-78.8677075,42.7429859],
    content: 'I got a wrist tattoo here!<br /><img src="libraries/wrist.jpg" />'
  },
  {
    location: [-71.5211524,41.6923012],
    content: 'My 2 best friends and I got matching tattoos here!<br /><img src="libraries/sun.jpg" />'
  },
  {
    location: [-78.6959795,42.9021998],
    content: 'I got my longest (9 hour) tattoo here!<br /><img src="libraries/arm.jpg" />'
  },
]

data.forEach(function(d) {

  let marker = new mapboxgl.Marker()
  marker.setLngLat(d.location)
  marker.addTo(map)

  let popup = new mapboxgl.Popup()
  popup.setHTML(d.content)
  marker.setPopup(popup)

})
