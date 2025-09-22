'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery,
  Rating,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Robert Johnson',
    position: 'Construction Manager',
    company: 'SkyBuild Constructions',
    content: '3G Infratech\'s precast solutions have dramatically improved our project timelines. The quality is exceptional and their technical support is always available when we need it.',
    rating: 5,
    avatar: '/static/images/avatar/1.jpg'
  },
  {
    id: 2,
    name: 'Sarah Williams',
    position: 'Project Director',
    company: 'Urban Infrastructure Ltd.',
    content: 'We\'ve been using 3G Infratech products for over three years now. Their innovative approach and consistent quality have made them our preferred supplier for all major projects.',
    rating: 4,
    avatar: '/static/images/avatar/2.jpg'
  },
  {
    id: 3,
    name: 'Michael Chen',
    position: 'CEO',
    company: 'GreenTech Builders',
    content: 'The sustainable aspect of 3G Infratech\'s products aligns perfectly with our company values. Their eco-friendly solutions don\'t compromise on durability or performance.',
    rating: 5,
    avatar: '/static/images/avatar/3.jpg'
  },
  {
    id: 4,
    name: 'Emma Rodriguez',
    position: 'Architect',
    company: 'DesignPlus Studios',
    content: 'I appreciate how 3G Infratech combines aesthetics with functionality. Their products offer design flexibility while maintaining structural integrity.',
    rating: 4,
    avatar: '/static/images/avatar/4.jpg'
  },
  {
    id: 5,
    name: 'James Wilson',
    position: 'Civil Engineer',
    company: 'InfraWorks Engineering',
    content: 'The technical support team at 3G Infratech is knowledgeable and responsive. They helped us customize solutions for our complex infrastructure project.',
    rating: 5,
    avatar: '/static/images/avatar/5.jpg'
  }
];

const CarouselContainer = styled(Box)({
  position: 'relative',
  overflow: 'hidden',
  padding: '32px 0',
  margin: '40px 0'
});

const CarouselTrack = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'translateX',
})<{ translateX: number }>(({ translateX }) => ({
  display: 'flex',
  transition: 'transform 0.5s ease-in-out',
  transform: `translateX(${translateX}px)`,
}));

const TestimonialCard = styled(Card)(({ theme }) => ({
  minWidth: 350,
  margin: '0 16px',
  padding: '32px',
  borderRadius: '16px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 280,
    margin: '0 8px',
    padding: '24px',
  },
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  zIndex: 10,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  [theme.breakpoints.down('sm')]: {
    width: 36,
    height: 36,
  },
}));

const TestimonialCarousel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const cardWidth = isMobile ? 296 : 382; // card width + margin
  const visibleCards = isMobile ? 1 : 3;

  const handlePrevious = useCallback(() => {
    setAutoPlay(false);
    setCurrentIndex(prev => (prev === 0 ? testimonials.length - visibleCards : prev - 1));
  }, [visibleCards]);

  const handleNext = useCallback(() => {
    setAutoPlay(false);
    setCurrentIndex(prev => (prev >= testimonials.length - visibleCards ? 0 : prev + 1));
  }, [visibleCards, testimonials.length]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev >= testimonials.length - visibleCards ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay, visibleCards, testimonials.length]);

  // Update translateX value when currentIndex changes
  useEffect(() => {
    setTranslateX(-currentIndex * cardWidth);
  }, [currentIndex, cardWidth]);

  // Reset autoPlay after user interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      setAutoPlay(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <Box sx={{ 
      py: { xs: 8, md: 12 }, 
      minHeight: { xs: '80vh', md: '90vh' },
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundImage: "url(/concrete2.jpg)", 
      backgroundSize: 'cover', 
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}>
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
        <Box sx={{ mb: { xs: 4, md: 6 } }}>
          <Typography 
            variant="h2" 
            component="h2" 
            align="center" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              color: theme.palette.primary.dark,
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            What Our Clients Say
          </Typography>
          <Typography 
            variant="h6" 
            align="center" 
            sx={{ 
              color: theme.palette.text.secondary,
              maxWidth: 600,
              margin: '0 auto',
              fontSize: { xs: '1rem', md: '1.25rem' },
              lineHeight: 1.6
            }}
          >
            Discover why industry leaders choose 3G Infratech for their infrastructure needs
          </Typography>
        </Box>

        <CarouselContainer 
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
          sx={{ my: { xs: 3, md: 5 } }}
        >
          <NavigationButton 
            onClick={handlePrevious} 
            sx={{ left: { xs: 4, sm: 16 } }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft />
          </NavigationButton>

          <Box sx={{ overflow: 'hidden' }}>
            <CarouselTrack translateX={translateX}>
              {testimonials.map((testimonial) => (
                <Box key={testimonial.id} sx={{ width: cardWidth, padding: '8px' }}>
                  <TestimonialCard>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar 
                        src={testimonial.avatar} 
                        sx={{ width: 64, height: 64, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.position}
                        </Typography>
                        <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
                          {testimonial.company}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="body1" color="text.secondary" sx={{ 
                      fontStyle: 'italic',
                      lineHeight: 1.6,
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      "{testimonial.content}"
                    </Typography>
                  </TestimonialCard>
                </Box>
              ))}
            </CarouselTrack>
          </Box>

          <NavigationButton 
            onClick={handleNext} 
            sx={{ right: { xs: 4, sm: 16 } }}
            aria-label="Next testimonial"
          >
            <ChevronRight />
          </NavigationButton>
        </CarouselContainer>

        {/* Indicator dots */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 3, md: 4 } }}>
          {Array.from({ length: testimonials.length - visibleCards + 1 }).map((_, index) => (
            <Box
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setAutoPlay(false);
              }}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                mx: 0.5,
                cursor: 'pointer',
                backgroundColor: currentIndex === index ? 'primary.main' : 'grey.400',
                transition: 'background-color 0.3s, transform 0.3s',
                transform: currentIndex === index ? 'scale(1.2)' : 'scale(1)',
                '&:hover': {
                  backgroundColor: currentIndex === index ? 'primary.dark' : 'grey.500',
                }
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default TestimonialCarousel;