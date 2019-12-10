import React, {useEffect, useState, useRef} from 'react'
import { connect } from 'react-redux'
import { setActivities } from '../actions/setActivites'
import '../css/box.css'


const getData = async (props) => { 
    props.setActivities();
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

const triggerRender = (iter, props) => {
    let arr = [];
    for(let i = iter.current; i < props.activities.data.length; i++ ){
        arr[arr.length] = props.activities.data[i];
    }
    window.scrollTo(0,0)
    return arr;
}


const ActivitiesList = props => {
    let prev = useRef(window.scrollY)
    let iter = useRef(90); 
    const [state, setState] = useState([]);

    useEffect(() => { 
        getData(props);
        setState(triggerRender(iter, props))
    }, [props.activities.data.join(',')])   

    const onScrollUp = debounce(function() {
        // console.log("scrolling up");
        if(iter.current >= 10){
            iter.current -= 10;
        }
        setState(triggerRender(iter, props))
        
    }, 50);

    let arr = triggerRender(iter, props)
    const handleNavigation = (e) => {
        const window = e.currentTarget;
        if (prev.current >  window.scrollTop) {
            onScrollUp();
            if(iter.current > 0){
                console.log(">0")
                window.scrollTo(0,0)
            }   
            
        } else if (prev.current <  window.scrollTop) {
            // console.log("scrolling down")
        }
        prev.current = window.scrollTop;
    }  
    let activities = arr.map((item) =>{
        return (
            <span className="list" key={item.id}>{item.activity}</span>
        )
    }) 
    return (
        <div className="box">
            {props.activities.isLoading ? <div className="loader"></div> : <div className="contents" onScroll={handleNavigation}>{activities}</div>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        activities: state.activities
    }
}

export default connect(mapStateToProps, { setActivities })(ActivitiesList)