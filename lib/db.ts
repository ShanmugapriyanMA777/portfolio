import { supabase, isSupabaseConfigured } from './supabase';
import * as mock from './mockData';

// Helper to delay simulation slightly in mock mode to feel realistic
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const db = {
  async getProfile(): Promise<mock.Profile> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .single();
        if (!error && data) return data as mock.Profile;
        console.warn('Supabase profile query failed, using mock data:', error);
      } catch (err) {
        console.error('Failed to fetch profile from Supabase:', err);
      }
    }
    await delay(300);
    return mock.mockProfile;
  },

  async getSocialLinks(): Promise<mock.SocialLink[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('social_links')
          .select('*')
          .order('display_order', { ascending: true });
        if (!error && data) return data as mock.SocialLink[];
        console.warn('Supabase social_links query failed, using mock:', error);
      } catch (err) {
        console.error(err);
      }
    }
    return mock.mockSocialLinks;
  },

  async getSkills(): Promise<mock.Skill[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('display_order', { ascending: true });
        if (!error && data) return data as mock.Skill[];
        console.warn('Supabase skills query failed, using mock:', error);
      } catch (err) {
        console.error(err);
      }
    }
    await delay(400);
    return mock.mockSkills;
  },

  async getProjects(): Promise<mock.Project[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*, project_images(image_url, is_hero), project_videos(video_url)')
          .order('display_order', { ascending: true });
        if (!error && data) {
          return data.map((p) => {
            const project = p as Record<string, unknown>;
            return {
              ...project,
              images: (project.project_images as Record<string, unknown>[]) || [],
              videos: (project.project_videos as Record<string, unknown>[]) || [],
            };
          }) as unknown as mock.Project[];
        }
        console.warn('Supabase projects query failed, using mock:', error);
      } catch (err) {
        console.error(err);
      }
    }
    await delay(500);
    return mock.mockProjects;
  },

  async getProjectById(id: string): Promise<mock.Project | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*, project_images(image_url, is_hero), project_videos(video_url)')
          .eq('id', id)
          .single();
        if (!error && data) {
          return {
            ...data,
            images: data.project_images || [],
            videos: data.project_videos || [],
          } as mock.Project;
        }
        console.warn(`Supabase project query for ID ${id} failed, using mock:`, error);
      } catch (err) {
        console.error(err);
      }
    }
    await delay(300);
    const found = mock.mockProjects.find((p) => p.id === id);
    return found || null;
  },

  async getExperience(): Promise<mock.Experience[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('experience')
          .select('*')
          .order('display_order', { ascending: true });
        if (!error && data) return data as mock.Experience[];
        console.warn('Supabase experience query failed, using mock:', error);
      } catch (err) {
        console.error(err);
      }
    }
    return mock.mockExperience;
  },

  async getEducation(): Promise<mock.Education[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('education')
          .select('*')
          .order('display_order', { ascending: true });
        if (!error && data) return data as mock.Education[];
        console.warn('Supabase education query failed, using mock:', error);
      } catch (err) {
        console.error(err);
      }
    }
    return mock.mockEducation;
  },

  async getCertificates(): Promise<mock.Certificate[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .order('display_order', { ascending: true });
        if (!error && data) return data as mock.Certificate[];
        console.warn('Supabase certificates query failed, using mock:', error);
      } catch (err) {
        console.error(err);
      }
    }
    await delay(400);
    return mock.mockCertificates;
  },

  async getAchievements(): Promise<mock.Achievement[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('achievements')
          .select('*')
          .order('display_order', { ascending: true });
        if (!error && data) return data as mock.Achievement[];
        console.warn('Supabase achievements query failed, using mock:', error);
      } catch (err) {
        console.error(err);
      }
    }
    return mock.mockAchievements;
  },

  async getServices(): Promise<mock.Service[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('display_order', { ascending: true });
        if (!error && data) return data as mock.Service[];
        console.warn('Supabase services query failed, using mock:', error);
      } catch (err) {
        console.error(err);
      }
    }
    return mock.mockServices;
  },

  async getBlogs(): Promise<mock.Blog[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) return data as mock.Blog[];
        console.warn('Supabase blogs query failed, using mock:', error);
      } catch (err) {
        console.error(err);
      }
    }
    await delay(300);
    return mock.mockBlogs;
  },

  async getBlogBySlug(slug: string): Promise<mock.Blog | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('slug', slug)
          .single();
        if (!error && data) return data as mock.Blog;
        console.warn(`Supabase blog slug query for ${slug} failed, using mock:`, error);
      } catch (err) {
        console.error(err);
      }
    }
    await delay(200);
    const found = mock.mockBlogs.find((b) => b.slug === slug);
    return found || null;
  },
  async sendMessage(name: string, email: string, subject: string, message: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to send email');
      }
    } catch (err) {
      console.warn('Resend API send failed, falling back to db insert:', err);
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('messages')
          .insert([{ name, email, subject, message }]);
      } catch (err) {
        console.error('Supabase message insert failed:', err);
      }
    }

    return { success: true };
  },
  async logVisitor(pagePath: string, country = 'Localhost', city = 'Localhost', userAgent = 'Browser'): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('visitor_logs')
          .insert([{ page_path: pagePath, country, city, user_agent: userAgent }]);
      } catch {
        // Silently capture error
      }
    }
  },

  async trackDownload(fileType: string, fileName: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('downloads')
          .insert([{ file_type: fileType, file_name: fileName }]);
      } catch {
        // Silently capture error
      }
    }
  }
};
