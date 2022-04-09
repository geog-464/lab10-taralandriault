// declare the map variable here to give it a global scope
let myMap;
let mapStyle; 

// we might as well declare our baselayer(s) here too
const OpenStreetMap_Mapnik = L.tileLayer(
	'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

function initialize(){
    loadMap();
};

function loadMap(mapid){
	try {
	myMap.remove()
	} catch(e) {
		console.log(e)
		console.log("no map to delete")
	} finally {
	//put your map loading code in here
	}
	if(mapid == 'mapa'){
			mapStyle = "a";
			
		//now reassign the map variable by actually making it a useful object, this will load your leaflet map
		myMap = L.map('mapdiv', {
			center: [45.50, -73.58]
			,zoom: 3
			,maxZoom: 22
			,minZoom: 3
			,layers: OpenStreetMap_Mapnik 
			});
		
		//add the basemap style(s) to a JS object, to which you could also add other baselayers. This object is loaded as a basemap selector as seen further down
		let baseLayers = {
			"Amtrak Stations": OpenStreetMap_Mapnik
		//,...
		};

		//declare basemap selector widget
		let lcontrol = L.control.layers(baseLayers);
		//add it to the map
		lcontrol.addTo(myMap);

		fetchData();
	}

	if(mapid == 'mapb')
		mapStyle = 'b';

		myMap = L.map('mapdiv', {
			center: [45.50, -73.58]
			,zoom: 3
			,maxZoom: 0
			,minZoom: 3
			,layers: OpenStreetMap_Mapnik 
			});
		
		//add the basemap style(s) to a JS object, to which you could also add other baselayers. This object is loaded as a basemap selector as seen further down
		let baseLayers = {
			"Amtrak Stations": OpenStreetMap_Mapnik
		//,...
		};

		//declare basemap selector widget
		let lcontrol = L.control.layers(baseLayers);
		//add it to the map
		lcontrol.addTo(myMap);

		fetchData();
	}
		
		
		
		
function fetchData(){
    //load the data
    if(mapStyle == 'a'){
	fetch('https://raw.githubusercontent.com/geog-464/lab10/main/data/Amtrak_Stations.geojson')
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(json, {style: styleAll, pointToLayer: generateCircles, onEachFeature: addPopups}).addTo(myMap);
		})
};
	if(mapStyle == 'b'){
	fetch('https://raw.githubusercontent.com/geog-464/lab10/main/data/megacities.geojson')
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(json, {style: styleAll, pointToLayer: generateCircles, onEachFeature: addPopups}).addTo(myMap);
		})
};

function generateCircles(feature, latlng) {
	return L.circleMarker(latlng);
}

function styleAll(feature, latlng) {
	if(mapStyle == 'a'){
		var styles = {dashArray:null, dashOffset:null, lineJoin:null, lineCap:null, stroke:false, color:'#000', opacity:1, weight:1, fillColor:null, fillOpacity:0 };
	
		if (feature.geometry.type == "Point") {
			styles.fillColor = '#fff'
			,styles.fillOpacity = 0.5
			,styles.stroke=true
			,styles.radius=9
			return styles;
		}
	
		if (typeof feature.properties.ZipCode == 'string'){
			styles.fillColor = '#00FFCC'
			return styles;
		}
	}
}
	
	if(mapStyle == 'b'){
		var styles = {dashArray:null, dashOffset:null, lineJoin:null, lineCap:null, stroke:false, color:'#000', opacity:1, weight:1, fillColor:null, fillOpacity:0 };
	
		if (features.geometry.type == "Point") {
			styles.fillColor = 'black'
			,styles.fillOpacity = 0.5
			,styles.stroke=true
			,styles.radius=9
			return styles;
		}
	}
}

function addPopups(feature, layer){
	if(mapStyle == 'a'){
		layer.bindPopup(feature.properties.StationNam);
	}
	if(mapStyle == 'b'){
		layer.bindPopup(feature.properties.city);
	}
}