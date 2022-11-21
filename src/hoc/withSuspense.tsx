import React, {ComponentType, ReactNode, Suspense} from "react";
import {Preloader} from "../components/common/Preloader";




export  function withSuspense (Component:ComponentType){

    return (props:any): ReactNode=>( <Suspense fallback={<Preloader/>}>
        <Component  {...props}/>
    </Suspense>
    )
}
