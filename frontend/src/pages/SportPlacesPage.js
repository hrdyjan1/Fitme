import React from 'react';
import Section from 'src/components/organisms/Section';
import { SportPlace } from 'src/components/organisms';

function SportPlacesPage() {
  return (
    <div>
      <Section>
        <SportPlace showAll />
      </Section>
    </div>
  );
}

export { SportPlacesPage };
