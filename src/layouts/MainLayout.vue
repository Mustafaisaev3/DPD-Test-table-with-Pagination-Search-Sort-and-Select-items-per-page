<template>
    <div class="main-layout">
        <div class="main-layout__inner">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<style scoped lang="scss">
.main-layout {
    width: 100%;
    height: 100vh;
}

.main-layout__inner {
    width: 100%;
    height: auto;

}
</style>