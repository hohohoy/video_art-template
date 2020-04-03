import * as $ from 'jquery';
// import ino from 'inobounce'  
import '../css/index.css'
import * as datalist from "../data.json";
import indexart from '../art/index.art';
var runtime = require('art-template/lib/runtime');
runtime.dateFormat = function(value, format){
    if(value<10){
        value++;
        value='0'+value
    }
    return value;
}

const innerhtml=indexart(datalist.default)
$(function () {
    // let u = navigator.userAgent
    // if (u.indexOf('iPhone') > -1) {
    //   ino.enable()
    // }
    $('.mainWrapper').html(innerhtml)
    $('.returnLogo').click(() => {
        if(!($('.vedio_wrapper').css("display")=='none')){
            stopVedio()
            return
        }
        $('.vedio_block').each(function(){
            if(!($(this).css("display")=='none')){
                $(this).hide()
                $('.mainPage').show()
                scrollZero()
                return
            }
        })
        if(!($('.mainPage').css("display")=='none')){
            window.history.go(-1);
            return
        }
        
    })
    window.onload = function () {
        $('.lilanz_box').hide();
    }
    $('.content_item').click(function(){
        scrollZero()
        let index=$(this).index()+1;
        $('.vedio_item').each(function(){
            let num=($(this).data('item')).toString()
            if(num.indexOf(index)==0){//第一个字符为视频编号
                $('.mainPage').hide()
                $(this).parent('.vedio_block').show() //显示对应视频块
            }
        })
    })
    $('body').on('click','.vedio_item',function(){
        let video='v'+$(this).data('item')
        let videosrc=datalist.videos
        let src=videosrc[`${video}`]
        let vedioDom=`<video id="v1" webkit-playsinline="true" x-webkit-airplay="true" playsinline="true"
        x5-video-orientation="h5" x5-video-player-fullscreen="true" x5-playsinline="" width="100%"
        controls>
        <source src=${src}/>
    </video>
    <span class="closebtn"></span>`
        $('.vedio_pop').html(vedioDom)
        $('.vedio_wrapper').show()
        $('video')[0].play()
    })
    $('body').on('click','.closebtn',function(){
        stopVedio()
    })
})
function stopVedio() { //暂停视频
    $('video')[0].pause()
    $('.vedio_wrapper').hide()
}
function scrollZero(){
    $('.mainWrapper').scrollTop(0)
}