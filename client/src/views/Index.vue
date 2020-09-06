<template>
    <div class="index">
       <HeadNav></HeadNav>
        <LeftMenu></LeftMenu> 
        <div class="rightContainer"></div>
       <router-view> </router-view>
    </div>
</template>
<script>
import HeadNav from '../components/HeadNav'
 import LeftMenu from '../components/LeftMenu' 
export default {
name:"index1",
components:{
    HeadNav,
    LeftMenu
 
}
};
</script>
<style>
/* .index1
{
    position:absolute;
width: 100%;
height: 100%;
overflow: hidden;
}
.rightContainer
{
   
    top:0;
    left: 180px;
    width: calc(100%-180px);
    height: calc(100%-71px);
    overflow: auto;
} */
.index {
    position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rightContainer {
  position: absolute;
  top: 0;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: auto;
}
</style>