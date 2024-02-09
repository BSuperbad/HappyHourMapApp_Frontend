import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const BASE_URL = "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class HappyHourApi {


static token;

  static async request(endpoint, data = {}, method = "get", tokenOverride = null) {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { 'Content-Type': 'application/json'};
    const token = tokenOverride || HappyHourApi.token;

    if (token) {
     
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await axios({ url, method, data, params: (method === "get") ? data : null, headers });
      return response.data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
  
  static async remove(endpoint, method="delete", tokenOverride = null) {
    console.debug("API Call:", endpoint, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { 'Content-Type': 'application/json' };
    const token = tokenOverride || HappyHourApi.token;
    if (token) {
      
     
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await axios.delete( url, { headers });
      return response.data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  // USERS routes

    /** Authenticate a user by matching username and password */

  static async authenticate(username, password) {
    const data = { username, password };
    const result = await this.request("auth/login", data, "post");
    this.token = result.token;
    return result;
  };

    /** Register a user */

  static async register(user) {
    const result = this.request("auth/register", user, "post");
    this.token = result.token;
    return result;
  };

   /** Get current user. */
  static async getCurrentUser(username) {
    try {
      let res = await this.request(`users/${username}`);
      return res.user;
    } catch (error) {
      console.error('Error in getUser API:', error);
      throw error;
    }
  }; 

  /** Get details on a user by username. */
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  };

  /** Get list of user-liked spaces */
  static async getLikedSpaces(username) {
    let res = await this.request(`users/${username}/likes`)
    return res.likedSpaces
  }

/**"like" the space */
  static async likeSpace(username, spaceTitle, data, tokenOverride = null) {
    const token = tokenOverride || HappyHourApi.token;
    const endpoint = `users/${username}/like/${spaceTitle}`;
    try {
      const res = await this.request(endpoint, data, "post", token);
      return res;
    } catch (e){
      console.error("Error liking space:", e.response);
    }
  };

  /** Get a list of user-visited spaces */
  static async getVisited(username) {
    let res = await this.request(`users/${username}/visits`);
    return res.visits;
  }

  /** Mark the space as visited */
  static async markVisited(username, spaceTitle, data, tokenOverride = null) {
    const token = tokenOverride || HappyHourApi.token;
    const endpoint = `users/${username}/visit/${spaceTitle}`;

    try {
      const res = await this.request(endpoint, data, "post", token);
      if(res && res.visited!== null){
      return res.visited;
      }else{
        console.error("API response does not contain expected visited field")
      }
    } catch (e){
      console.error("Error marking space as visited:", e.response);
      throw e;
    }
  }; 

  // UPDATES for various types
  static async update(type, identifier, data, tokenOverride = null) {
    const adminToken = tokenOverride || HappyHourApi.token;
    console.log("adminToken:", adminToken);
  
    const endpointMappings = {
          'user': `users/${identifier}/edit`,
          'space': `spaces/${identifier}/edit`,
          'category': `categories/${identifier}/edit`,
          'rating': `ratings/${identifier}/edit`,
          'comment': `comments/${identifier}/edit`,
          'location': `locations/${identifier}`
        };
  
      const endpoint = endpointMappings[type];

          if (!endpoint) {
      throw new Error('Invalid type');
    }

    try {
      const res = await this.request(endpoint, data, 'patch', adminToken);
      return res;
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
      throw error;
    }
  }

  // CREATES various types

  static async create(type, data, tokenOverride = null) {
    const adminToken = tokenOverride || HappyHourApi.token;
    let endpoint;
  
    if (type === 'user') {
      endpoint = `users/new`;
    } else if (type === 'space') {
      endpoint = `spaces`;
    } else if (type === 'category') {
      endpoint = `categories`;
    } else if (type === 'location'){
      endpoint = `locations`;
    } else {
      throw new Error('Invalid type');
    }
  
      const res = await this.request(endpoint, data, 'post', adminToken.token);
      return res;
  };


  



// COMMENTS routes

  /** Get a single comment */

  static async getComment(comment_id) {
    const endpoint = `comments/${comment_id}`;
    try {
      const commentData = await this.request(endpoint);
      return commentData;
    } catch (e) {
      console.error("Error fetching comment", e);
      throw e;
    }
  }

  /** Get comment list for:
     -comments by user
     -comments for space */

  static async getComments(type, identifier) {
    let endpoint;

    if (type === 'user') {
      endpoint = `comments/users/${identifier}`;
    } else if (type === 'space') {
      endpoint = `comments/spaces/${identifier}`;
    } else {
      throw new Error('Invalid comment type');
    }

    let res = await this.request(endpoint);
    return res.comments;
  };

  static async addComment(username, spaceTitle, data, tokenOverride = null) {
    const token = tokenOverride || HappyHourApi.token;
    const endpoint = `comments/${username}/spaces/${spaceTitle}`;
    try {
      const res = await this.request(endpoint, data, "post", token);
      return res;
    } catch (e){
      console.error("Error creating comment:", e.response);
    }
  };

/** LOCATIONS routes */

  static async getLocation(neighborhood) {
    let res = await this.request(`locations/neighborhoods/${neighborhood}`);
    return res;
  };

// RATINGS routes

/** Get average rating for space */

  static async getAvgRating(title) {
    let res = await this.request(`ratings/spaces/${title}`);
    return res.rating.rating;
  };

  static async addRating(username, spaceTitle, data, tokenOverride = null) {
    const token = tokenOverride || HappyHourApi.token;
    const endpoint = `ratings/${username}/spaces/${spaceTitle}`;
    try {
      const res = await this.request(endpoint, data, "post", token);
      return res;
    } catch (e){
      console.error("Error adding rating:", e.response);
    }
  };

  static async getUserRating(username, title) {
    let res = await this.request(`ratings/${username}/spaces/${title}`);
    return res

  }

  static async getRatingById(rating_id){
    let res = await this.request(`ratings/${rating_id}`);
    return res;
  }


 // SPACES routes */ 

/** Get details on a space by title */

  static async getSpace(title) {
    let res = await this.request(`spaces/${title}`);
    return res.space;
  };
  

  /** Get spaces by query params */

  static async findAllSpaces(searchFilters = {}, tokenOverride = null) {
    const token = tokenOverride || HappyHourApi.token;
    const { title, category, city, neighborhood, sortBy } = searchFilters;
  
    const query = {
      title,
      category,
      city,
      neighborhood,
      sortBy,
    };
  
    const filteredQuery = Object.fromEntries(
      Object.entries(query).filter(([key, value]) => value !== undefined && value !== null)
    );
    const queryString = new URLSearchParams(filteredQuery).toString();
  
    try {
      const res = await this.request(`spaces?${queryString}`, null, 'get', token);
      return res;
    } catch (error) {
      console.error('Error fetching spaces.', error);
      return {error: error.message}
    }
  };
  

}

export default HappyHourApi;
