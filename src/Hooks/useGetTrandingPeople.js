// @ts-nocheck
import {GET} from '@Services/API';
import {useEffect, useState} from 'react';

export const useGetTrandingPeople = props => {
  const {isForPage, url} = props;
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState([]);
  const uri = url ? url : '/trending/person/week';
  useEffect(() => {
    GET(uri)
      .then(data => {
        setPeople(isForPage === 'details' ? data.cast : data.results);
        setTimeout(() => {
          setLoading(false);
        }, 250);
      })
      .catch(() => {
        setTimeout(() => {
          setLoading(false);
        }, 250);
      });
  }, [isForPage, uri]);

  return [people, loading];
};
