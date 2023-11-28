<template>
    <v-container id="wrap">
        <TaskBody :mainTask="mainTask"></TaskBody>
        <!-- <v-row>
            <v-col>
                <v-card>
                    <v-card-title style="font-size:2em">
                        {{ mainTask.start_date}}
                    </v-card-title>
                        <v-card-subtitle class="mt-3" style="font-size:1.5em">
                            <template v-if="mainTask.status === '1'">
                                <v-chip
                                    class="me-1"
                                    color="primary"
                                    label
                                >
                                <v-icon left>
                                    mdi-circle-slice-2
                                </v-icon>
                                진행중
                                </v-chip>
                            </template>
                            <template v-else-if="mainTask.status === '2'">
                                <v-chip
                                    class="me-1"
                                    color="warning"
                                    label
                                >
                                <v-icon left>
                                    mdi-stop-circle-outline
                                </v-icon>
                                보류
                                </v-chip>
                            </template>
                            <template v-else-if="mainTask.status === '3'">
                                <v-chip
                                    class="me-1"
                                    color="success"
                                    label
                                >
                                <v-icon left>
                                    mdi-check-outline
                                </v-icon>
                                완료
                                </v-chip>
                            </template>
                        </v-card-subtitle>
                        <v-card-text class="mt-5" style="font-size:2em">
                            <pre>{{ mainTask.task_text }} </pre>
                        </v-card-text>
                        <v-card-actions class="mt-5">
                            <v-spacer></v-spacer>
                            <v-btn
                            class="mr-2"
                            @click="editTask"
                            >
                                <v-icon>
                                mdi-pencil
                              </v-icon>
                              수정
                            </v-btn>
                            <v-btn
                            class="mr-2"
                            color="warning"
                            @click.stop="deleteTask"
                            >
                              <v-icon>
                                mdi-delete
                              </v-icon>
                              삭제
                            </v-btn>
                        </v-card-actions>
                </v-card>
            </v-col>
        </v-row> -->
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>
                        작업전 이미지
                    </v-card-title>
                    <v-row>
                        <div class="img-div" v-for="(b, i) in mainTask.Images.filter((v) => v.before_after === 'before')" :key="i">
                            <v-img :src="`${b.src}`"
                            aspect-ratio="1"
                            max-height="300px"
                            max-width="300px"
                            >
                                <v-btn
                                    class="img-delete-btn"
                                    absolute 
                                    right
                                    fab
                                    dark
                                    small
                                    @click="deleteImg(b.id)"
                                >
                                    <v-icon dark>
                                        mdi-minus
                                    </v-icon>
                                </v-btn>
                            <template v-slot:placeholder>
                                <v-row
                                  class="fill-height ma-0"
                                  align="center"
                                  justify="center"
                                >
                                  <v-progress-circular
                                    indeterminate
                                    color="grey lighten-5"
                                  ></v-progress-circular>
                                </v-row>
                            </template>
                            </v-img>
                        </div>
                    </v-row>
                    <v-row>
                        <div class="img-div" v-for="(bimg, i) in beforeImages" :key="bimg">
                            <v-img :src="`${bimg}`"
                                aspect-ratio="1"
                                max-height="300px"
                                max-width="300px"
                            >
                                <template v-slot:placeholder>
                                    <v-row
                                      class="fill-height ma-0"
                                      align="center"
                                      justify="center"
                                    >
                                      <v-progress-circular
                                        indeterminate
                                        color="grey lighten-5"
                                      ></v-progress-circular>
                                    </v-row>
                                </template>
                                <v-btn
                                    absolute
                                    bottom
                                    right
                                    rounded
                                    dark
                                    @click="onRemoveBeforeImage(i)">
                                    <v-icon dark>
                                        mdi-delete
                                    </v-icon>
                                </v-btn>
                            </v-img>
                        </div>
                    </v-row>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <input
                            ref="beforeImages"
                            type="file" 
                            name="beforeImage"
                            multiple
                            hidden
                             @change="onChangeBeforeImages">
                        <v-btn
                        @click="openBeforeImages"
                        type="button">
                            작업전 이미지 추가
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>
                        작업후 이미지
                    </v-card-title>
                    <v-row>
                        <div class="img-div" v-for="(a, i) in mainTask.Images.filter((v) => v.before_after === 'after')" :key="i">
                            <v-img
                                :src="`${a.src}`"
                                aspect-ratio="1"
                                max-height="300px"
                                max-width="300px"
                            >
                                <v-btn
                                class="img-delete-btn"
                                absolute 
                                right
                                fab
                                dark
                                small
                                @click="deleteImg(a.id)"
                            >
                                <v-icon dark>
                                    mdi-minus
                                </v-icon>
                                </v-btn>
                                <template v-slot:placeholder>
                                    <v-row
                                    class="fill-height ma-0"
                                    align="center"
                                    justify="center"
                                    >
                                    <v-progress-circular
                                        indeterminate
                                        color="grey lighten-5"
                                    ></v-progress-circular>
                                    </v-row>
                                </template>
                            </v-img>
                        </div>
                    </v-row>
                    <v-row>
                        <div class="img-div" v-for="(aimg, i) in afterImages" :key="aimg">
                            <v-img
                                :src="`${aimg}`"
                                aspect-ratio="1"
                                max-height="300px"
                                max-width="300px"
                            >
                                <template v-slot:placeholder>
                                    <v-row
                                      class="fill-height ma-0"
                                      align="center"
                                      justify="center"
                                    >
                                      <v-progress-circular
                                        indeterminate
                                        color="grey lighten-5"
                                      ></v-progress-circular>
                                    </v-row>
                                </template>
                                <v-btn
                                absolute
                                bottom
                                right
                                rounded
                                dark
                                @click="onRemoveAfterImage(i)">
                                <v-icon dark>
                                    mdi-delete
                                </v-icon>
                            </v-btn>
                            </v-img>
                        </div>
                    </v-row>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <input
                            ref="afterImages"
                            type="file"
                            name="afterImage"
                            multiple 
                            hidden 
                            @change="onChangeAfterImages">
                        <v-btn
                        @click="openAfterImages"
                        type="button">
                            작업후 이미지 추가
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-spacer></v-spacer>
            <v-btn
                class="mt-7"
                @click="finishTask"
            >
                <v-icon>
                    mdi-check-circle
                </v-icon>
                작업완료
            </v-btn>
        </v-row>
    </v-container>
</template>

<script>

import TaskBody from "~/components/task/taskSpecification/TaskInfo.vue";

export default {
    head() {
        return {
        meta: [
        {
            name: 'description',
            content: 'INDI 일일업무',
        }, {
            hid: 'ogtitle',
            name: 'og:title',
            content: 'INDI Design',
        }, {
            hid: 'ogdescription',
            name: 'og:description',
            content: 'INDI 업무 시스템',
        }] 
        }
    },
    fetch({ store, params }) {
        return store.dispatch(`tasks/loadTask`, {
            id: params.id
        })
    },
    computed: {
        mainTask() {
            return this.$store.state.tasks.mainTask;
        },
        // taskText() {
        //     return this.mainTask.task_text.split('\n').join('<br>');
        // },
        beforeImages() {
            return this.$store.state.tasks.beforeImages;
        },
        afterImages() {
            return this.$store.state.tasks.afterImages;
        }
    },
    components : {
        TaskBody,
    },
    methods: {
        finishTask() {
            this.$store.dispatch('tasks/finishTask', {
                id: this.$route.params.id,
            })
            .then(() => {
                this.$router.push('/task/');
            })
        },
        openBeforeImages() {
            this.$refs.beforeImages.click();
        },
        onChangeBeforeImages(e) {
            const beforeImagesFormData = new FormData();
            [].forEach.call(e.target.files, (f) => {
                beforeImagesFormData.append('beforeImage', f);
            });
            // for (let key of beforeImagesFormData.keys()) {
            //     console.log(key);
            //     }
            // for (let value of beforeImagesFormData.values()) {
            // console.log(value);
            // }
            this.$store.dispatch('tasks/uploadBeforeImages', beforeImagesFormData);
        },
        openAfterImages() {
            this.$refs.afterImages.click();
        },
        onChangeAfterImages(e) {
            const afterImagesFormData = new FormData();
            [].forEach.call(e.target.files, (f) => {
                afterImagesFormData.append('afterImage', f);
            });
            this.$store.dispatch('tasks/uploadAfterImages', afterImagesFormData);
        },
        deleteImg(imgId) {
            this.$store.dispatch('tasks/deleteImg', imgId)
        },
        onRemoveBeforeImage(index) {
            this.$store.commit('tasks/removeBeforeImage', index);
        },
        onRemoveAfterImage(index) {
            this.$store.commit('tasks/removeAfterImage', index);
        }
    }
}
</script>

<style scoped>
#wrap {
    max-width: 1000px;
}

.img-div {
    height: 300px;
    width: 300px;
    margin-left: 20px;
    margin-top: 40px;
}

.imgpath-delete-btn {
    margin-top: 10px;
}

.img-delete-btn {
    color: #B31312;
}

</style>