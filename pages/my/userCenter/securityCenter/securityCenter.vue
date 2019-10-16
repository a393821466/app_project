<template>
	<view class="securityView">
		<view class="securityTable">
			<best-gauge :config="gaugeOption" bgColor="#1b82d1"></best-gauge>
		</view>
	</view>
</template>

<script>
	import bestGauge from '@/components/best-gauge/best-gauge.vue'
	export default {
		 components:{
			bestGauge
		},
		data() {
			let _width = uni.upx2px(350);
			return {
				gaugeOption:{ //定义参数
					id: 'gaugeId0',
					value: 0,
					axisTickLength: 2//该属性与axisTick互斥，存在axisTickLength并大于0，axisTick就无效
				}
			};
		},
		onReady(){
			this.add()
		},
		methods:{
			add(){
				let timer=setTimeout(()=>{
					this.gaugeOption.value+=1;
					this.add();
				},10)
				if(this.gaugeOption.value==90){
					clearTimeout(timer);
				}
			}
		}
	}
</script>

<style lang="scss">
@import './securityCenter.scss';
</style>
