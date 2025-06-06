/**
 * GameMonetize Feed数据获取类
 */
class GameMonetizeFetcher {
    constructor() {
        this.baseUrl = 'https://gamemonetize.com/feed.php';
        this.cacheKey = 'gameMonetizeCache';
        this.cacheExpiry = 24 * 60 * 60 * 1000; // 24小时缓存

        // 游戏类别映射
        this.categories = {
            '0': 'Action',
            '1': '.IO',
            '2': '2 Player',
            '3': '3D',
            '4': 'Adventure',
            '5': 'Arcade',
            '6': 'Bejeweled',
            '7': 'Boys',
            '8': 'Clicker',
            '9': 'Cooking',
            '10': 'Girls',
            '11': 'Hypercasual',
            '12': 'Multiplayer',
            '13': 'Puzzle',
            '14': 'Racing',
            '15': 'Shooting',
            '16': 'Soccer',
            '17': 'Sports',
            '18': 'Stickman',
            '19': 'Baby Hazel'
        };

        // 创建分类名称到ID的反向映射
        this.categoryNameToId = {};
        Object.entries(this.categories).forEach(([id, name]) => {
            this.categoryNameToId[name] = id;
        });
    }

    /**
     * 清除所有缓存数据
     */
    clearCache() {
        try {
            // 清除所有分类的缓存
            Object.keys(this.categories).forEach(categoryId => {
                localStorage.removeItem(`${this.cacheKey}_${categoryId}`);
            });
            // 清除全部游戏的缓存
            localStorage.removeItem(this.cacheKey);
            console.log('Cache cleared successfully');
        } catch (error) {
            console.error('Error clearing cache:', error);
        }
    }

    /**
     * 获取游戏数据
     * @param {string} category - 游戏分类ID，不传则获取所有游戏
     * @param {number} page - 页码，从1开始
     * @returns {Promise<Array>} 游戏数据数组
     */
    async fetchGames(category = null, page = 1) {
        try {
            // 构建缓存key
            const cacheKey = category && category !== 'all' ? `${this.cacheKey}_${category}` : this.cacheKey;

            // 检查缓存，如果不需要强制刷新且是第一页
            if (page === 1) {
                const cachedData = this.getCachedData(cacheKey);
                if (cachedData) {
                    console.log('Using cached data for page 1');
                    return cachedData;
                }
            }

            // 构建URL参数
            const params = new URLSearchParams({
                format: '0',
                num: '20',
                page: page.toString()
            });

            // 如果指定了分类且不是'all'，添加分类参数
            if (category && category !== 'all') {
                params.append('category', category);
            }

            // 发送请求
            const url = `${this.baseUrl}?${params}`;
            console.log('Fetching games from:', url);
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch games');
            }

            const data = await response.json();
            
            // 调试：打印原始数据
            console.log('API Response:', data);
            console.log('Requested category:', category);
            console.log('Requested page:', page);
            
            // 处理游戏数据
            const games = data.map(game => {
                // 调试：打印每个游戏的原始分类数据
                console.log('Game:', game.title, 'Raw category:', game.category, 'Type:', typeof game.category);
                
                // 处理分类
                let categoryId;
                if (typeof game.category === 'string') {
                    // 如果API返回的是分类名称，尝试转换为ID
                    categoryId = this.categoryNameToId[game.category] || '0';
                } else {
                    // 如果API返回的是ID或其他值，使用默认值
                    categoryId = '0';
                }
                
                // 调试：打印转换后的分类ID
                console.log('Converted categoryId:', categoryId, 'Type:', typeof categoryId);
                
                // 获取分类名称
                const categoryName = this.categories[categoryId];
                
                // 调试：打印最终使用的分类名称
                console.log('Final category:', categoryName);

                return {
                    id: game.id,
                    title: game.title,
                    description: game.description,
                    instructions: game.instructions,
                    category: categoryName,
                    categoryId: categoryId,
                    tags: game.tags,
                    thumb: game.thumb,
                    url: game.url,
                    width: game.width,
                    height: game.height,
                    rating: game.rating
                };
            });

            // 只缓存第一页数据
            if (page === 1) {
                this.cacheData(games, cacheKey);
            }

            return games;
        } catch (error) {
            console.error('Error fetching games:', error);
            throw error;
        }
    }

    /**
     * 获取缓存的游戏数据
     * @param {string} key - 缓存键名
     * @returns {Array|null} 缓存的游戏数据或null
     */
    getCachedData(key) {
        try {
            const cached = localStorage.getItem(key);
            if (!cached) return null;

            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp > this.cacheExpiry) {
                localStorage.removeItem(key);
                return null;
            }

            return data;
        } catch (error) {
            console.error('Error reading cache:', error);
            return null;
        }
    }

    /**
     * 缓存游戏数据
     * @param {Array} data 游戏数据
     * @param {string} key 缓存键名
     */
    cacheData(data, key) {
        try {
            const cache = {
                data,
                timestamp: Date.now()
            };
            localStorage.setItem(key, JSON.stringify(cache));
        } catch (error) {
            console.error('Error caching data:', error);
        }
    }

    /**
     * 获取所有游戏类别
     * @returns {Array} 类别数组
     */
    getCategories() {
        return Object.values(this.categories);
    }

    /**
     * 根据类别ID获取类别名称
     * @param {string} categoryId 类别ID
     * @returns {string} 类别名称
     */
    getCategoryName(categoryId) {
        return this.categories[categoryId] || 'Other';
    }
}

// 导出单例实例
export default new GameMonetizeFetcher(); 