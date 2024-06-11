import { defineStore } from 'pinia';
import AuthService from '@/services/auth.service';


export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')as string),
        role : null,
        returnUrl: null,
        isSidebarMenuVisible: false     
    }),
    actions: {
        async login(email: string, password: string) {
            const user = await AuthService.login({ email, password })
            this.user = user
            this.role = user.role
            localStorage.setItem('user', JSON.stringify(user))
            return user 
        },
        logout() {
            this.user = null;
            this.role = null;
            localStorage.removeItem('user')
           
        }
    }
});
