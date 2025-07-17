import Daredevil from '../cover/images/daredevil-cover.jpg';
import MyNameIsEarl from '../cover/images/my-name-is-earl.jpg';
import Ozark from '../cover/images/ozark.jpg';
import SweetHome from '../cover/images/sweet-home.jpg';
import TheMentalist from '../cover/images/the-mentalist.jpg';
import Westworld from '../cover/images/westworld.jpg';

export default function getGallery() {
  return [
    {
      id: 'daredevil',
      title: 'Daredevil',
      description: 'Action | Crime | Drama',
      image: Daredevil,
    },
    {
      id: 'my-name-is-earl',
      title: 'My Name Is Earl',
      description: 'Comedy',
      image: MyNameIsEarl,
    },
    {
      id: 'ozark',
      title: 'Ozark',
      description: 'Crime | Drama | Thriller',
      image: Ozark,
    },
    {
      id: 'sweet-home',
      title: 'Sweet Home',
      description: 'Drama | Horror | Thriller',
      image: SweetHome,
    },
    {
      id: 'the-mentalist',
      title: 'The Mentalist',
      description: 'Crime | Drama | Mystery',
      image: TheMentalist,
    },
    {
      id: 'westworld',
      title: 'Westworld',
      description: 'Drama | Sci-Fi | Thriller',
      image: Westworld,
    },
  ];
}
