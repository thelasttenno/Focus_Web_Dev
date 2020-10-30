var map = L.map('map').setView([49.8880, -119.4960], 13); // initialize the map
var icon2; //  initialize icon2
//////////////////////////////////////////
/// initialize a cont to control  the sidebar
//////////////////////////////////////////
const setAndShow = (c) => {
  sidebar.setContent(c);
  sidebar.show();
};
//////////////////////////////////////////
/// load a tile layer
//////////////////////////////////////////
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Tiles by <a href="https://openstreetmap.org">openstreetmap</a>, Data by <a href="https://www.trailforks.com/">TrailForks</a> and Images from <a href="https://www.pinkbike.com/photo/podlist/">PinkBike</a>',
  maxZoom: 17,
  minZoom: 9
}).addTo(map); //adds  object to map
//////////////////////////////////////////
///create Marker and search layer
//////////////////////////////////////////
$.getJSON("map2.geojson", function(data) { // load GeoJSON from an external file
  var featuresLayer = new L.GeoJSON(data, { // add GeoJSON layer to the map once the file is loadeds
    onEachFeature: function(feature, marker) { // create onEachFeature function (it loops through till it has gone through all the objects in the geojson)
      var numPts = feature.geometry.coordinates.length; //find  number  of points in LineString
      var beg = feature.geometry.coordinates[0]; // find beggining  of LineString
      var end = feature.geometry.coordinates[numPts - 1]; // find end  of LineString
      var beg1 = (beg[1] + end[1]) / 2; // find middle  of LineString
      var end1 = (beg[0] + end[0]) / 2; // find  middle  of LineString
      var icon1 = feature.properties.difficulty_id //get difficulty_id
      icon1 = parseInt(icon1) //get int from  string
      switch (icon1) { //select correct icon for difficulty
        case 1:
          icon2 = "trail_diff_access.svg";
          break;
        case 2:
          icon2 = "trail_diff_access.svg";
          break;
        case 3:
          icon2 = "trail_diff_green.svg";
          break;
        case 4:
          icon2 = "trail_diff_blue.svg";
          break;
        case 5:
          icon2 = "trail_diff_blackdiamond.svg";
          break;
        case 6:
          icon2 = "trail_diff_doubleblack.svg";
          break;
        case 7:
          icon2 = "trail_diff_access.svg";
          break;
        case 8:
          icon2 = "trail_diff_proline.svg";
          break;
      }
      var icon4 = L.icon({ //icon options
        iconUrl: icon2,
        iconSize: [25, 20]
      });
      var marker = L.marker([beg1, end1], { //create icons
        icon: icon4
      });
      //creates popup and sidebar content
      marker.bindPopup("<b>Name:</b> " + ' <a href =' + feature.properties.url + '>' +
        feature.properties.name + '</a>' + '<br>' + '<button type="button" name="button" onClick="setAndShow(\'' + feature.properties.name.replace(/(\r\n|\n|\r)/gm, "") + '\' +  \'' + '<br>' + "Difficulty: " + feature.properties.difficulty + '\'+\'' + '<br>' + "Runs: " + feature.properties.direction + '\'+\'' + '<br>' + "<a href=" +
        feature.properties.url + ">Veiw details</a>" + '\')">Click Here to Open Side Panel</button>');
      return marker.addTo(map); //adds  object to map
    }
  });

  //////////////////////////////////////////
  ///search engine
  //////////////////////////////////////////
  var searchControl = new L.Control.Search({ //calls  the search plugin
    layer: featuresLayer, //what  layer we are looking  for
    propertyName: 'name', //the name of the trail we want
    marker: false, //not to  sure what  this  does  as  it  works both true  or  false but  it wont work without it
    moveToLocation: function(latlng, title, map) { //moves you to searched location
      var zoom = map.getBoundsZoom(latlng.layer.getBounds());
      map.setView(latlng, zoom); // access the zoom
    }
  });
  searchControl.on('search:locationfound', function(e) { //some stuff for styling
    e.layer.setStyle({
      fillColor: '#3f0',
      color: '#0f0'
    });
    if (e.layer._popup)
      e.layer.openPopup();
  }).on('search:collapsed', function(e) {

    featuresLayer.eachLayer(function(layer) { //restore feature color
      featuresLayer.resetStyle(layer);
    });
  });
  map.addControl(searchControl); //inizialize search control
});
//////////////////////////////////////////
///create second  layer i.e. the trails  themselves
/////////////////////////////////////////
$.getJSON("map2.geojson", function(data) { // load GeoJSON from an external file
  var colors = L.geoJson(data, { // add GeoJSON layer to the map once the file is loadeds
    style: function(feature) { // create style function
      var fillColor;
      return {
        color: feature.properties.stroke, //find difficulty color of the trail
        weight: 3, //set thicknes
        Opacity: .6 //opacity  duh
      }
    },
    onEachFeature: function(feature, layer) { // create onEachFeature function (it loops through till it has gone through all the objects in the geojson)
      //creates popup and sidebar content
      layer.bindPopup("<b>Name:</b> " + ' <a href =' + feature.properties.url + '>' +
        feature.properties.name + '</a>' + '<br>' + '<button type="button" name="button" onClick="setAndShow(\'' + feature.properties.name.replace(/(\r\n|\n|\r)/gm, "") + '\' +  \'' + '<br>' + "Difficulty: " + feature.properties.difficulty + '\'+\'' + '<br>' + "Runs: " + feature.properties.direction + '\'+\'' + '<br>' + "<a href=" +
        feature.properties.url + ">Veiw details</a>" + '\')">Click Here to Open Side Panel</button>');
    }
  }).addTo(map); //adds  object to map
});
//////////////////////////////////////////
///sidebar controls  and  options
//////////////////////////////////////////
var sidebar = L.control.sidebar('sidebar', {
  closeButton: true,
  position: 'right',
  autoPan: true,
});
map.addControl(sidebar);
map.on('click', function() {
  sidebar.hide();
})