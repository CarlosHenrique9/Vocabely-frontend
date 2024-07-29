import { CourseType } from "@/src/services/courseService";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import SlideCard from "../slideCard";

interface Props {
  course?: CourseType[];
}

const SlideComponent = ({ course = [] }: Props) => {
  if (!Array.isArray(course)) {
    console.error("Expected course to be an array, but got:", course);
    course = [];
  }

  let slideCount = 0;

  if (course.length > 4) {
    slideCount = 4;
  } else {
    slideCount = course.length;
  }

  return (
    <>
      <div className="d-flex flex-column align-items-center py-4">
        {course.length > 0 ? (
          <Splide
            options={{
              type: "loop",
              perPage: slideCount,
              perMove: 1,
              width: slideCount * 300,
              pagination: false,
              arrows: course.length > 4,
              drag: course.length > 4,
              breakpoints: {
                1200: {
                  perPage: slideCount >= 2 ? 2 : 1,
                  width: slideCount >= 2 ? 600 : 300,
                  arrows: course.length > 2,
                  drag: course.length > 2,
                },
                600: {
                  perPage: 1,
                  width: 300,
                  arrows: course.length > 1,
                  drag: course.length > 1,
                },
              },
            }}
          >
            {course.map((courseItem) => (
              <SplideSlide key={courseItem.id}>
                <SlideCard course={courseItem} />
              </SplideSlide>
            ))}
          </Splide>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default SlideComponent;
