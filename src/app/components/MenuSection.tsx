'use client';

import React, { useState, useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';


// ── Types ──────────────────────────────────────────────────────────────────
interface MenuItem {
  name: string;
  description?: string;
  tag?: 'veg' | 'nonveg' | 'pork';
  badge?: string;
  image: string;
  imageAlt: string;
}

interface MenuCategory {
  id: string;
  label: string;
  icon: string;
  items: MenuItem[];
}

// ── Menu Data ──────────────────────────────────────────────────────────────
const menuData: MenuCategory[] = [
{
  id: 'wheat-burgers',
  label: 'Whole Wheat Burgers',
  icon: 'FireIcon',
  items: [
  {
    name: 'Cajun Chicken Whole Wheat Burger',
    description: 'Spiced cajun chicken patty in a wholesome whole wheat bun',
    tag: 'nonveg',
    image: "https://images.unsplash.com/photo-1637510269710-70bac1d937e8",
    imageAlt: 'Cajun chicken burger with crispy golden patty, lettuce and tomato on wheat bun, warm amber lighting'
  },
  {
    name: 'Grilled Chicken Whole Wheat Burger',
    description: 'Double patty — flame-grilled chicken with fresh greens',
    tag: 'nonveg',
    badge: 'Double Patty',
    image: "https://images.unsplash.com/photo-1718408998442-b02bfcda89bb",
    imageAlt: 'Grilled chicken double patty burger on whole wheat bun, dramatic side lighting with grill marks visible'
  },
  {
    name: 'Grilled Mutton Whole Wheat Burger',
    description: 'Double patty — juicy mutton patties, slow-grilled to perfection',
    tag: 'nonveg',
    badge: 'Double Patty',
    image: "https://images.unsplash.com/photo-1700835880369-467ebff9d324",
    imageAlt: 'Thick mutton burger stacked high with double patty, caramelized onions on dark background'
  },
  {
    name: 'Spicy Grilled Mutton Whole Wheat Burger',
    description: 'Double patty — fiery mutton with chilli kick',
    tag: 'nonveg',
    badge: 'Double Patty',
    image: "https://images.unsplash.com/photo-1711028043107-24e8aceadcbe",
    imageAlt: 'Spicy mutton burger with red chilli sauce dripping, intense warm lighting on dark surface'
  },
  {
    name: 'Spicy Chicken Whole Wheat Burger',
    description: 'Double patty — bold heat with tender chicken',
    tag: 'nonveg',
    badge: 'Double Patty',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_12d4035b1-1776767248130.png",
    imageAlt: 'Spicy double patty chicken burger with jalapeños and hot sauce on whole wheat bun, moody lighting'
  },
  {
    name: 'Cajun Veg Whole Wheat Burger',
    description: 'Cajun-spiced vegetarian patty, packed with flavour',
    tag: 'veg',
    image: "https://images.unsplash.com/photo-1543339462-88f4850abc5b",
    imageAlt: 'Vegetarian cajun burger with vibrant green lettuce and colorful toppings on whole wheat bun, bright food photography'
  },
  {
    name: 'Spinach & Corn Whole Wheat Burger',
    description: 'Herbivores — wholesome spinach & corn patty',
    tag: 'veg',
    badge: 'Herbivores',
    image: "https://images.unsplash.com/photo-1612539466244-0af512b5961e",
    imageAlt: 'Green spinach and corn veggie burger with fresh greens and yellow corn visible, bright natural light'
  },
  {
    name: 'Plant Based Chicken Whole Wheat Burger',
    description: 'Double patty — next-gen plant protein, real burger taste',
    tag: 'veg',
    badge: 'Double Patty',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d0093ba2-1771908595440.png",
    imageAlt: 'Plant based burger with thick patty and fresh toppings on whole wheat bun, clean modern food photography'
  },
  {
    name: 'Truffle Mushroom Wheat Burger',
    description: 'Earthy truffle oil, sautéed mushrooms, premium wheat bun',
    tag: 'veg',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f18b84d0-1767201599503.png",
    imageAlt: 'Gourmet truffle mushroom burger with dark mushrooms and truffle aioli on wheat bun, sophisticated dark food photography'
  }]

},
{
  id: 'hot-dogs',
  label: 'Hot Dogs',
  icon: 'FireIcon',
  items: [
  {
    name: 'Chicken Hot Dog',
    description: 'Classic chicken sausage in a soft bun',
    tag: 'nonveg',
    image: "https://images.unsplash.com/photo-1649457788045-27453783424c",
    imageAlt: 'Classic chicken hot dog in soft bun with mustard and ketchup, bright food photography'
  },
  {
    name: 'New York Chicken Hotdog',
    description: 'NY-style with sauerkraut and yellow mustard',
    tag: 'nonveg',
    image: "https://images.unsplash.com/photo-1563567644743-81256d4aedca",
    imageAlt: 'New York style chicken hot dog with sauerkraut and mustard in paper wrap, street food aesthetic'
  },
  {
    name: 'Cheesey Chicken Hotdog',
    description: 'Loaded with melted cheese and chicken sausage',
    tag: 'nonveg',
    image: "https://images.unsplash.com/photo-1649402164035-07ea5582147c",
    imageAlt: 'Cheesy chicken hot dog with melted golden cheese dripping over sausage in bun, warm appetizing lighting'
  },
  {
    name: 'Barbecue Chicken Hotdog',
    description: 'Smoky BBQ sauce with grilled chicken sausage',
    tag: 'nonveg',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_158d6eb4d-1778166539571.png",
    imageAlt: 'Barbecue chicken hot dog with dark smoky BBQ glaze and caramelized onions, moody dramatic lighting'
  },
  {
    name: 'Pork Hot Dog',
    description: 'Premium pork sausage in a soft bun',
    tag: 'pork',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_19de1db14-1774120548752.png",
    imageAlt: 'Classic pork hot dog sausage in soft bun with condiments, clean food photography'
  },
  {
    name: 'New York Pork Hotdog',
    description: 'NY-style pork with classic toppings',
    tag: 'pork',
    image: "https://images.unsplash.com/photo-1641246630294-c48c8aec58fc",
    imageAlt: 'New York pork hot dog in paper lined basket with yellow mustard and relish, street food style'
  },
  {
    name: 'Cheesey Pork Hotdog',
    description: 'Cheese-smothered pork sausage',
    tag: 'pork',
    image: "https://images.unsplash.com/photo-1721648373259-60fb6bb13dbd",
    imageAlt: 'Cheesy pork hot dog with generous cheese sauce over grilled sausage, close-up warm lighting'
  },
  {
    name: 'Barbecue Pork Hotdog',
    description: 'Smoky BBQ glazed pork sausage',
    tag: 'pork',
    image: "https://images.unsplash.com/photo-1625139195784-cb50ef57343d",
    imageAlt: 'Barbecue pork hot dog with thick BBQ sauce and crispy onion straws, dramatic dark background'
  },
  {
    name: 'Veg Hot Dog',
    description: 'Plant-based sausage in a soft bun',
    tag: 'veg',
    image: "https://images.unsplash.com/photo-1619683257272-453f50763cfe",
    imageAlt: 'Vegetarian hot dog with plant based sausage and colorful fresh toppings in bun, bright food photography'
  },
  {
    name: 'New York Veg Hotdog',
    description: 'NY-style veg dog with all the classics',
    tag: 'veg',
    image: "https://images.unsplash.com/photo-1612392062335-300bb9bd3054",
    imageAlt: 'New York style vegetarian hot dog with mustard and relish toppings, vibrant street food photography'
  },
  {
    name: 'Cheesy Veg Hotdog',
    description: 'Melted cheese on a hearty veg sausage',
    tag: 'veg',
    image: "https://images.unsplash.com/photo-1603876468126-3f1fbc48de56",
    imageAlt: 'Cheesy vegetarian hot dog with melted cheese and fresh herbs, bright clean food photography'
  },
  {
    name: 'Barbecue Veg Hotdog',
    description: 'Smoky BBQ veg sausage with tangy sauce',
    tag: 'veg',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_15e7b80e2-1764758811277.png",
    imageAlt: 'Barbecue vegetarian hot dog with smoky sauce and grilled peppers, appetizing warm food photography'
  }]

},
{
  id: 'dips',
  label: 'Dips',
  icon: 'SparklesIcon',
  items: [
  {
    name: 'Naagin Mayonnaise',
    description: 'Fiery house-made chilli mayo — not for the faint-hearted',
    tag: 'veg',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17b460068-1777707554093.png",
    imageAlt: 'Bright red spicy naagin mayonnaise in small bowl with chilli garnish on dark surface'
  },
  {
    name: 'Honey Mustard',
    description: 'Sweet and tangy golden honey mustard',
    tag: 'veg',
    image: "https://images.unsplash.com/photo-1515624424395-231050e373d2",
    imageAlt: 'Golden honey mustard dip in white ceramic bowl with honey drizzle on wooden surface, warm lighting'
  },
  {
    name: 'Truffle Mayonnaise',
    description: 'Luxurious black truffle-infused mayonnaise',
    tag: 'veg',
    image: "https://images.unsplash.com/photo-1692348023709-47ff577f7277",
    imageAlt: 'Creamy white truffle mayonnaise in small dark bowl with truffle shavings, gourmet food photography'
  },
  {
    name: 'Animal Sauce (Veg)',
    description: 'Secret-recipe tangy sauce — veg-friendly',
    tag: 'veg',
    image: "https://images.unsplash.com/photo-1547823807-55c3180c1d6d",
    imageAlt: 'Rich orange-brown animal sauce in small bowl with herbs, bold food photography on dark background'
  }]

},
{
  id: 'combos',
  label: 'Combos',
  icon: 'TagIcon',
  items: [
  {
    name: 'Patty Burger + Side + Shake or Beverage',
    description: 'Serves 1 — the classic solo meal deal',
    badge: '15% Off',
    tag: 'nonveg',
    image: "https://images.unsplash.com/photo-1683052889763-bea90109c3b6",
    imageAlt: 'Burger combo meal with side fries and milkshake on tray, bright food photography warm tones'
  },
  {
    name: 'Double Patty Burger + Side + Shake or Beverage',
    description: 'Serves 1 — go big or go home',
    badge: '15% Off',
    tag: 'nonveg',
    image: "https://images.unsplash.com/photo-1628209623671-a2a765cf3a49",
    imageAlt: 'Double patty burger combo with loaded fries and tall milkshake, dramatic dark background food photography'
  },
  {
    name: 'Hand Pulled Burger + Side + Shake or Beverage',
    description: 'Serves 1 — the premium experience',
    badge: '15% Off',
    tag: 'nonveg',
    image: "https://images.unsplash.com/photo-1576873884215-a83c6486fcc4",
    imageAlt: 'Hand pulled burger combo with crispy sides and refreshing beverage on dark table'
  },
  {
    name: '2 Sliders + Side',
    description: 'Perfect pair — two sliders with a side',
    tag: 'nonveg',
    image: "https://images.unsplash.com/photo-1675891776607-69005d5921f5",
    imageAlt: 'Two small slider burgers with side of fries in basket, casual dining food photography'
  },
  {
    name: '2 Sliders + 2 Sides',
    description: 'Double the sides, double the joy',
    tag: 'nonveg',
    image: "https://images.unsplash.com/photo-1710061807604-98ef40f8b990",
    imageAlt: 'Two slider burgers with two different side dishes spread on table, generous portion food photography'
  },
  {
    name: '4 Sliders + Side',
    description: 'Share or conquer — four sliders with a side',
    tag: 'nonveg',
    image: "https://images.unsplash.com/photo-1692167009221-903a502740d9",
    imageAlt: 'Four mini slider burgers arranged on wooden board with side of fries, party food photography'
  }]

},
{
  id: 'beverages',
  label: 'Beverages',
  icon: 'BeakerIcon',
  items: [
  {
    name: 'Thums Up (330 ml)',
    description: 'The bold Indian cola',
    tag: 'veg',
    image: "https://images.unsplash.com/photo-1716052322758-7d2c197ff561",
    imageAlt: 'Dark cola in glass with ice and condensation, dark moody beverage photography'
  },
  {
    name: 'Coke (330 ml)',
    description: 'Classic Coca-Cola',
    tag: 'veg',
    image: "https://images.unsplash.com/photo-1533305799375-12e411fb0588",
    imageAlt: 'Classic Coke in glass with ice cubes and red straw, bright clean beverage photography'
  },
  {
    name: 'Chocolate Thickshake (280 ml)',
    description: 'Rich, creamy, indulgent',
    tag: 'veg',
    image: "https://images.unsplash.com/photo-1578743598076-cbb47bd6c340",
    imageAlt: 'Thick dark chocolate milkshake in tall glass with whipped cream and chocolate drizzle, rich moody lighting'
  },
  {
    name: 'Vanilla Thickshake (280 ml)',
    description: 'Smooth classic vanilla cream shake',
    tag: 'veg',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_11fc9a38b-1770812083987.png",
    imageAlt: 'Creamy white vanilla milkshake in tall glass with whipped cream on top, clean bright photography'
  },
  {
    name: 'Strawberry Thickshake (280 ml)',
    description: 'Fresh strawberry blended thick',
    tag: 'veg',
    image: "https://images.unsplash.com/photo-1586922566665-3becb195b5b0",
    imageAlt: 'Bright pink strawberry milkshake in tall glass with fresh strawberry garnish, vibrant food photography'
  },
  {
    name: 'Non-Alcoholic Beer — Strawberry (330 ml)',
    description: 'Refreshing fruit-forward brew',
    tag: 'veg',
    image: "https://images.unsplash.com/photo-1591237270483-9487e2977c2f",
    imageAlt: 'Pink strawberry non-alcoholic beer in frosted glass bottle on dark surface, cool refreshing photography'
  },
  {
    name: 'Non-Alcoholic Beer — Cranberry (330 ml)',
    description: 'Tart and vibrant cranberry brew',
    tag: 'veg',
    image: "https://images.unsplash.com/photo-1650906175964-8c7e8c01a6f8",
    imageAlt: 'Deep red cranberry non-alcoholic beer in glass with condensation on dark background'
  },
  {
    name: 'Non-Alcoholic Beer — Peach (330 ml)',
    description: 'Sweet peach with a gentle fizz',
    tag: 'veg',
    image: "https://images.unsplash.com/photo-1616141501140-e45dd6bcfe7b",
    imageAlt: 'Peach colored non-alcoholic beer in tall glass with peach slice garnish, warm golden lighting'
  },
  {
    name: 'Goan Mule (250 ml)',
    description: 'Tropical ginger-lime refresher',
    tag: 'veg',
    image: "https://images.unsplash.com/photo-1653043038468-15f5c5e85cba",
    imageAlt: 'Tropical Goan mule mocktail in copper mug with lime and mint, bright tropical photography'
  },
  {
    name: 'Australian Sour (250 ml)',
    description: 'Citrus-forward sour mocktail',
    tag: 'veg',
    image: "https://images.unsplash.com/photo-1668243108953-09caa01b291b",
    imageAlt: 'Yellow citrus sour mocktail in coupe glass with lemon wheel, clean bar photography'
  },
  {
    name: 'Caribbean Punch (250 ml)',
    description: 'Fruity tropical punch with island vibes',
    tag: 'veg',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1234e5e29-1772414255750.png",
    imageAlt: 'Bright orange Caribbean punch mocktail in tall glass with tropical fruit garnish, vibrant photography'
  },
  {
    name: 'Sleepy Owl Classic Cold Coffee (180 ml)',
    description: '100% Arabica, smooth & less bitter',
    tag: 'veg',
    image: "https://images.unsplash.com/photo-1604247548381-6597ad0c3043",
    imageAlt: 'Sleepy Owl cold coffee in small glass bottle with ice, dark moody coffee photography'
  },
  {
    name: 'Sleepy Owl Salted Caramel Cold Coffee (180 ml)',
    description: 'Sweet caramel meets Arabica cold brew',
    tag: 'veg',
    image: "https://images.unsplash.com/photo-1662624938943-f8f4f1840866",
    imageAlt: 'Salted caramel cold coffee with golden caramel drizzle in glass, warm amber lighting'
  },
  {
    name: 'Sleepy Owl Hazelnut Cold Coffee (180 ml)',
    description: 'Nutty hazelnut cold brew perfection',
    tag: 'veg',
    image: "https://images.unsplash.com/photo-1605122443165-a5247d2f899e",
    imageAlt: 'Hazelnut cold coffee in glass with hazelnut garnish, rich brown tones moody photography'
  }]

},
{
  id: 'desserts',
  label: 'Desserts',
  icon: 'CakeIcon',
  items: [
  {
    name: 'Hazelnut Mousse Cake',
    description: 'Silky hazelnut mousse layered in a rich chocolate cake',
    tag: 'veg',
    image: "https://images.unsplash.com/photo-1713274786456-e68f1accba6c",
    imageAlt: 'Elegant hazelnut mousse cake slice with smooth chocolate glaze and hazelnut crumble on dark plate, fine dining dessert photography'
  },
  {
    name: 'Butter Brownie',
    description: 'Dense, fudgy butter brownie — warm from the oven',
    tag: 'veg',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d6430122-1772384435699.png",
    imageAlt: 'Rich dark chocolate butter brownie square with crackly top and fudgy interior on parchment paper, warm moody lighting'
  }]

}];


// ── Tag Component ──────────────────────────────────────────────────────────
function DietTag({ tag }: {tag?: 'veg' | 'nonveg' | 'pork';}) {
  if (!tag) return null;
  if (tag === 'veg') {
    return (
      <span className="tag-veg text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
        Veg
      </span>);

  }
  if (tag === 'pork') {
    return (
      <span className="text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 bg-amber-900/20 text-amber-400 border border-amber-700/30">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
        Pork
      </span>);

  }
  return (
    <span className="tag-nonveg text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
      Non-Veg
    </span>);

}

// ── Menu Card ──────────────────────────────────────────────────────────────
function MenuCard({ item, index }: {item: MenuItem;index: number;}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting) {setVisible(true);observer.disconnect();}},
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="menu-card reveal-hidden"
      style={{
        transitionDelay: `${index % 3 * 80}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s cubic-bezier(0.4,0,0.2,1) ${index % 3 * 80}ms, transform 0.6s cubic-bezier(0.4,0,0.2,1) ${index % 3 * 80}ms, border-color 0.4s, box-shadow 0.4s, transform 0.4s`
      }}>
      
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden relative bg-muted">
        <AppImage
          src={item.image}
          alt={item.imageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        
        {/* Placeholder swap hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-sm">
          <p className="text-xs text-white/70 text-center px-4 font-medium">
            📸 Swap with your photo
          </p>
        </div>
        {item.badge &&
        <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">
            {item.badge}
          </div>
        }
      </div>

      {/* Content */}
      <div className="p-5 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold text-card-foreground leading-snug flex-1">
            {item.name}
          </h3>
          <DietTag tag={item.tag} />
        </div>
        {item.description &&
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {item.description}
          </p>
        }
      </div>
    </div>);

}

// ── Main Component ─────────────────────────────────────────────────────────
export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('wheat-burgers');
  const sectionRef = useRef<HTMLElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting) setHeaderVisible(true);},
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const activeData = menuData.find((c) => c.id === activeCategory);

  return (
    <section id="menu" ref={sectionRef} className="py-16 px-6 relative">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute -top-40 right-0 w-96 h-96 blob-red opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div
          className="text-center space-y-4 mb-12"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease'
          }}>
          
          <p className="section-label">Our Menu</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Something for <span className="text-primary">Everyone</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            From whole wheat burgers to hot dogs, dips, combos, beverages and desserts — every bite crafted with care.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-10"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s'
          }}>
          
          {menuData.map((cat) =>
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            activeCategory === cat.id ? 'filter-tab-active' : 'filter-tab-inactive'}`
            }>
            
              {cat.label}
            </button>
          )}
        </div>

        {/* Grid — category-specific column count */}
        {activeData &&
        <div
          key={activeData.id}
          className={`grid gap-5 ${
          activeData.items.length === 2 ?
          'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto' :
          activeData.items.length === 4 ?
          'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`
          }>
          
            {activeData.items.map((item, idx) =>
          <MenuCard key={item.name} item={item} index={idx} />
          )}
          </div>
        }

        {/* Placeholder note */}
        <p className="text-center text-xs text-muted-foreground/50 mt-8 font-medium">
          💡 All food photos are placeholders — hover any card and swap with your own images
        </p>
      </div>
    </section>);

}