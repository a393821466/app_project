import chache from '@/common/utils/storage'
import config from '@/common/utils/config'
export const state={
	bannerData:[],
	notice:[],
	temList:[],
	actList:[],
	breakUrl:chache.get('baseUrl')
}

export const mutations={
	['BANNERACTIVITY'](state,val){
		let das = val.content
		let banners = []
		let activitys = []
		let u = config.domain
		for (let i = 0; i < das.length; i++) {
			let mapData = {
			  id: das[i].id,
			  title: das[i].pictureTitle,
			  url: u + '/' + das[i].url
			}
			if (das[i].pictureType === 0) {
			  mapData.breakUrl = das[i].jumpDetailsUrl
			  banners.push(mapData)
			} else {
			  mapData.breakUrl = u + '/' + das[i].jumpDetailsUrl
			  activitys.push(mapData)
			}
		}
		chache.set('banner',banners)
		chache.set('activity',activitys)
		state.bannerData = banners
		state.actList = activitys
	},
	['NOTICE'](state,val){
		state.notice=val.data.content
		chache.set('notice',val.data.content)
	},
	['TEMPLATELIST'](state,val){
		if(val.status){
			state.temList=val.data
			chache.set('template',val.data)
		}
	},
	['BIMGURL'](state,url){
		chache.set('baseUrl',url)
		state.breakUrl = url
	},
	['RESETHOMESTATE'](state){
		state.bannerData=[]
		state.notice=[]
		state.temList=[]
		state.actList=[]
		state.breakUrl=''
	}
}

