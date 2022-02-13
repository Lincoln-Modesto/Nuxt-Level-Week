import { Mutations } from "./challenges/types";

export const actions = {
	nuxtServerInit({ commit }: any, { app }: any){
		const cookie = app.$cookiz.get('movueit')

		if(cookie){
			commit(`challenges/${Mutations.SAVE_COOKIE_DATA}`, cookie)
		}
	}
}
