import React from 'react';
import { hot } from 'react-hot-loader';
import { useEffect, useState} from 'react';




function Map(props){
    const [loading, setLoading] = useState(true);
    const mystyle = {
        width: "465px",
        height: "200px",

      };
      const mystyle2 = {
        fontSize : "30px",
        marginLeft: "38%",
        marginTop: "10%",
      };
    const url="http://open.mapquestapi.com/geocoding/v1/address?key=ibZe0B2nRXunlCZ3wUuU8F64JAERzXIw&location=" + props.data.direccion+ ",santiago,chile";
    fetch(url).then(response => response.json())
  .then(data => {
      
        const lat = data.results[0].locations[0].latLng.lat;
        const lng = data.results[0].locations[0].latLng.lng;
        mapboxgl.accessToken = 'pk.eyJ1Ijoibmlja2Nhc3RpbGxvIiwiYSI6ImNraG02Ym5raDAzaXkydW43eHpqMDJqMGQifQ.ntt-deX2VNzTItJIvUY77w';
            
        
        
        setLoading(false);
        if (loading===false){
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: 13.5
        });

        map.addControl(new mapboxgl.NavigationControl());

        var layerList = document.getElementById('menu');
        var inputs = layerList.getElementsByTagName('input');
        
        function switchLayer(layer) {
        var layerId = layer.target.id;
        map.setStyle('mapbox://styles/mapbox/' + layerId);
        }
        
        for (var i = 0; i < inputs.length; i++) {
        inputs[i].onclick = switchLayer;
        }

        var marker = new mapboxgl.Marker({'color': '#ED1C5B', 'scale': 0.7})
        .setLngLat([lng, lat])
        .addTo(map);

        }
        
        
    }); 
    if (loading) return (
        <i className="fa fa-refresh fa-spin" style={mystyle2}></i>
      );
    
    return (
      <div>
        <div id='map' style={mystyle}></div>
        
          
      </div>
    );
  }

export default hot(module)(Map);
