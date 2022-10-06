<template>
    <transition name="slide" mode="out-in">
        <router-view></router-view>
    </transition>
</template>

<style>
    .slide-enter-active,
    .slide-leave-active {
        transition: opacity 1s, transform 1s;
    }

    .slide-enter,
    .slide-leave-to {
        opacity: 0;
        transform: translateY(-30%);
    }
</style>