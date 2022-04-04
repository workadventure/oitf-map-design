/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));

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

closeDoor();
WA.room.onEnterLayer('doorZone').subscribe(toggleDoor);
