export interface Post {
    id : string;
    date : Date;
    created_time : Date;
    caption : string;
    picture : string;
    permalink : string;
    engagement : number;
    post_engagement_rate : number;
    type : string;
    profile_followers : number;
    campaigns : string[];
    comments : number;
    shares : number;
    reactions_total : number;
    reactions_like : number;
    reactions_love : number;
    reactions_wow : number;
    reactions_haha : number;
    reactions_sad : number;
    reactions_angry : number;
    reactions_thankful : number;
    reactions_pride : number;
    reactions_care : number;
    reach : number;
    impressions : number;
}