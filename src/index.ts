/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().then(() => {

    //TODO update zone of document and not variable shared
    console.info('Init WA OITF');

    let userDomain: string = '';
    WA.player.tags.forEach((e: string) => {
        console.log(e);
        if(e.match(/http(?:s)?:\/\/(?:[\w-]+\.)*([\w-]{1,63})(?:\.(?:\w{3}|\w{2,10}))(?:$|\/)/i) != null){
            userDomain = e;
        }
    });
    //delete '/' caractere if exist
    if(userDomain.substring(userDomain.length -1, userDomain.length -1) === '/'){
        userDomain = userDomain.substring(0, userDomain.length -1);
    }
    WA.state.saveVariable('domain', userDomain);
    console.log('domain', WA.state.loadVariable('domain'));

    const urlVideo = WA.state.loadVariable('urlVideo');
    if(urlVideo != null){
        WA.state.saveVariable('urlVideo', `${urlVideo}/${WA.player.id}`);
    }
    console.log('urlVideo', WA.state.loadVariable('urlVideo'));

    const urlDocument = WA.state.loadVariable('urlDocument');
    if(urlDocument != null){
        WA.state.saveVariable('urlDocument', `${urlDocument}/${WA.player.id}`);
    }
    console.log('urlDocument', WA.state.loadVariable('urlDocument'));

    const chapitreChoice = WA.state.loadVariable('chapitreChoice');
    if(chapitreChoice != null){
        WA.state.saveVariable('chapitreChoice', `${chapitreChoice}/${WA.player.id}`);
    }
    console.log('chapitreChoice', WA.state.loadVariable('chapitreChoice'));

    const projectChoice = WA.state.loadVariable('projectChoice');
    if(projectChoice != null){
        WA.state.saveVariable('projectChoice', `${projectChoice}/${WA.player.id}`);
    }
    console.log('projectChoice', WA.state.loadVariable('projectChoice'));

    const eventChoice = WA.state.loadVariable('eventChoice');
    if(eventChoice != null){
        WA.state.saveVariable('eventChoice', `${eventChoice}/${WA.player.id}`);
    }
    console.log('eventChoice', WA.state.loadVariable('eventChoice'));
}).catch(e => console.error(e));

/* #Manage premium door */

const DOOR_CLOSED_LAYER_NAME = 'doorClosed';
const DOOR_OPENED_LAYER_NAME = 'doorOpened';

const closeDoor = () => {
    WA.room.showLayer(DOOR_CLOSED_LAYER_NAME);
    WA.room.hideLayer(DOOR_OPENED_LAYER_NAME);
}
const openDoor = () => {
    WA.room.hideLayer(DOOR_CLOSED_LAYER_NAME);
    WA.room.showLayer(DOOR_OPENED_LAYER_NAME);
}
const isPremium = () => {
    return WA.player.tags.includes('premium') || WA.player.tags.includes('Premium') 
    || WA.player.tags.includes('PREMIUM') || WA.player.tags.includes('editor');
}
function toggleDoor() {
    console.log('isPremium()', isPremium());
    if(isPremium()){
        openDoor();
    }else{
        closeDoor();
    }
}

let domain = 'https://premium.admin.onceintheflow.com'
const initDomain = () => {
    for(const tag of WA.player.tags){
        if(tag.indexOf('https://') !== -1){
            domain = tag;
            break;
        }
    }
}

WA.onInit().then( () => {
    //get domain
    initDomain();

    //define the domain
    if(!WA.state.hasVariable('domain') && WA.state.loadVariable('domain') !== domain){
        WA.state.saveVariable('domain', domain);
    }

    //close the door
    closeDoor();

    //subscribe to open the door if user is premium
    WA.room.onEnterLayer('doorZone').subscribe(toggleDoor);
});
