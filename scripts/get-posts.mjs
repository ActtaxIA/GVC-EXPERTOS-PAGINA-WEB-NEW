import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Faltan variables de entorno NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function getPosts() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      id,
      slug,
      title,
      featured_image,
      category:post_categories(name, slug)
    `)
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error:', error)
    return
  }

  console.log('\n📝 ARTÍCULOS DEL BLOG:\n')
  posts.forEach((post, i) => {
    console.log(`${i + 1}. [${post.category?.slug || 'sin-categoria'}] ${post.title}`)
    console.log(`   Slug: ${post.slug}`)
    console.log(`   Imagen actual: ${post.featured_image || 'SIN IMAGEN'}`)
    console.log('')
  })

  console.log(`\nTotal: ${posts.length} artículos`)
}

getPosts()

