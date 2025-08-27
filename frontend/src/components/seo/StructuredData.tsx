import { Villa } from '@/types';

interface StructuredDataProps {
  type: 'website' | 'organization' | 'lodging' | 'breadcrumb';
  data?: any;
  villa?: Villa;
}

export default function StructuredData({ type, data, villa }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Villa 95, Rangala',
          url: 'https://villa95rangala.com',
          description: 'Luxury hill country retreat in Rangala, Sri Lanka. Experience tranquility and comfort in our modern villa with stunning mountain views.',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://villa95rangala.com/booking',
            'query-input': 'required name=checkIn,checkOut,guests'
          }
        };

      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Villa 95',
          url: 'https://villa95rangala.com',
          logo: 'https://villa95rangala.com/logo.png',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+94-11-234-5678',
            contactType: 'customer service',
            areaServed: 'LK',
            availableLanguage: 'English'
          },
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Villa 95, Rangala',
            addressLocality: 'Rangala',
            addressRegion: 'Central Province',
            postalCode: '20000',
            addressCountry: 'LK'
          }
        };

      case 'lodging':
        if (!villa) return null;
        return {
          '@context': 'https://schema.org',
          '@type': 'LodgingBusiness',
          name: 'Villa 95, Rangala',
          description: villa.description,
          url: 'https://villa95rangala.com',
          telephone: '+94-11-234-5678',
          email: 'info@villa95rangala.com',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Villa 95, Rangala',
            addressLocality: 'Rangala',
            addressRegion: 'Central Province',
            postalCode: '20000',
            addressCountry: 'LK'
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: villa.coordinates?.lat || 7.8731,
            longitude: villa.coordinates?.lng || 80.7718
          },
          priceRange: '$$',
          amenityFeature: villa.facilities.map(facility => ({
            '@type': 'LocationFeatureSpecification',
            name: facility
          })),
          numberOfRooms: villa.bedrooms,
          maximumAttendeeCapacity: villa.maxGuests,
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: villa.rating,
            reviewCount: villa.reviewCount
          },
          image: villa.images,
          openingHours: 'Mo-Su 00:00-23:59',
          checkinTime: '14:00',
          checkoutTime: '11:00'
        };

      case 'breadcrumb':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: data.map((item: any, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
          }))
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();
  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
