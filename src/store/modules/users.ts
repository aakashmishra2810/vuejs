import { VuexModule, Module, getModule, MutationAction, Mutation, Action } from 'vuex-module-decorators';
import store from '@/store';
import { User, Profile, UserSubmit, UpdateUser, RegisterUser, NewArticle } from '../models';
import { loginUser, fetchProfile, updateUserDetails, setJWT, fetchUser, registerUser, clearJWT, CreateNewArticle, followUser, unFollowUser } from '../api';

@Module({
    namespaced: true,
    name: 'users',
    store,
    dynamic: true,
})
class UsersModule extends VuexModule {
public user: User | null = null;
public profile: Profile | null  = null;
public localStorageUserKey: string = 'userData';

@Mutation
public setUser(user: User) {
    window.localStorage.setItem(this.localStorageUserKey, JSON.stringify(user));
    this.user = user;
}

@Mutation
public setProfile(profile: Profile) {
    this.profile = profile;
}

@Mutation
public updateSetProfile(user: User) {
    this.user = user;
}

@Mutation
public loadUser(user: User) {
    this.user = user;
}

@Mutation
public loadNewUser(user: User) {
    this.user = user;
}

@Mutation
public logoutUser() {
    window.localStorage.removeItem(this.localStorageUserKey);
    this.user = null;
}

@Mutation
public loggedInUser() {
    if (window.localStorage.getItem(this.localStorageUserKey)) {
        this.user = JSON.parse(String(window.localStorage.getItem(this.localStorageUserKey))) as User;
        setJWT(this.user.token);
    }
}

get username() {
    return this.user && this.user.username || null;
}

get isAuthenticated() {
    return this.user && this.user.username && this.user.token;
}



 @Action({commit: 'setUser'})
public async login(userSubmit: UserSubmit) {
    try {
    const user = await loginUser(userSubmit);
    setJWT(user.token);
    return user;
    } catch (e) {
        throw new Error('Invalid username or password');
    }
 }

 @Action({commit: 'setProfile'})
 public async loadProfile(userName: string) {
     const profile = await fetchProfile(userName);
     return profile;
 }

@Action({ commit: 'updateSetProfile'})
    public async UpdateProfile(updateUser: UpdateUser) {
        try {
            const user = await updateUserDetails(updateUser);
            return user;
        } catch (error) {
            throw new Error('Error while updating information');
        }

    }

@Action({ commit: 'loadUser'})
    public async LoadUser() {
        const user = await fetchUser();
        return user;
    }

@Action({commit: 'loadNewUser'})
    public async CreateUser(newUser: RegisterUser) {
        try {
        const user = await registerUser(newUser);
        return user;
    } catch (error) {
        throw new Error('Error while creating user. Please try again 1');
    }
    }

@Action({ commit: 'logoutUser'})
    public async Logout() {
        if (this.user) {
            clearJWT(this.user.token);
        }
    }

    @Action({ commit: 'loggedInUser' })
    public async alreadyLoggedInUser() {
    }

    @Action({ commit: 'setProfile' })
    public async follow(username: string) {
        const profile = await followUser(username);
        return profile;
    }

    @Action({ commit: 'setProfile' })
    public async unfollow(username: string) {
        const profile = await unFollowUser(username);
        return profile;
    }
}

export default getModule(UsersModule);
