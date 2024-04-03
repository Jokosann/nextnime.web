'use client'
import useFetch from '@/hooks/useFetch'
import Image from 'next/image'
import Rating from '../Atom/Rating'
import Button from '../Atom/Button'
import Link from 'next/link'
import { img } from '@/utils/img'

const DetailManga = ({ id }: { id: string }) => {
  const { data, loading }: any = useFetch(`/manga/${id}/full`)
  const result = data?.data

  console.log(result)

  const ImageDetail = () => {
    return (
      <div className="w-full h-auto sm:w-[300px] rounded-md overflow-hidden">
        <Image
          src={result?.images?.webp.image_url ? result?.images?.webp.image_url : img.Poster}
          width={100}
          height={100}
          alt={result?.title}
          priority
          className="w-full h-full object-cover bg-center"
        />
      </div>
    )
  }

  const RatingDetail = () => {
    return (
      <div className="w-14 h-14 my-3 rounded-full overflow-hidden bg-white">
        <Rating rating={result?.score} />
      </div>
    )
  }

  const Genre = () => {
    return (
      <div className="flex flex-wrap gap-x-2 gap-y-0">
        {result?.genres.map((item: any) => (
          <p key={item.mal_id} className="bg-primary px-3 py-1 rounded-md text-white mb-2 text-sm">
            {item.name}
          </p>
        ))}
      </div>
    )
  }

  const RankPopularity = () => {
    return (
      <div className="flex items-center gap-2 mb-1">
        <p className="text-xs bg-red-secondary px-2 py-1 rounded-md text-white w-fit h-fit">
          Rank #{result?.rank ? result?.rank : '?'}
        </p>
        <p className="text-xs bg-red-secondary px-2 py-1 rounded-md text-white w-fit h-fit">
          Popularity #{result?.popularity ? result?.popularity : '?'}
        </p>
      </div>
    )
  }

  const ListStudio = () => {
    return (
      <p className="list-detail">
        <span className="font-bold">Authors : </span>
        {result?.authors.length > 0 ? (
          <>
            {result?.authors?.map((item: any, i: number) => (
              <span key={i}>
                {item.name}
                {result?.authors?.length > 1 && ', '}
              </span>
            ))}
          </>
        ) : (
          '-'
        )}
      </p>
    )
  }

  const ListDetail = ({ title, data, opt = '' }: { title: string; data: any; opt?: string }) => {
    return (
      <p className="list-detail">
        <span className="font-bold">{title} :</span> {data ? `${data} ${opt}` : '?'}
      </p>
    )
  }

  const Serializations = () => {
    return (
      <div className="text-sm flex flex-wrap gap-1 mt-2">
        {result?.serializations.map((item: any, index: number) => (
          <Button variant={`${index % 2 === 0 ? 'primary' : 'third'}`} key={index}>
            <Link
              target="_blank"
              href={item.url}
              className="w-full h-full flex justify-center items-center"
            >
              {item.name}
            </Link>
          </Button>
        ))}
      </div>
    )
  }

  return (
    <div className="mb-20">
      {loading ? (
        <p className="text-red-500">Loading...</p>
      ) : (
        <>
          <div className="w-full flex flex-col sm:flex-row gap-4">
            <ImageDetail />
            <div className="w-full h-fit sm:w-3/4">
              <h1 className="text-2xl font-bold">{result?.title}</h1>
              <p className="text-base text-gray-light mb-2">{result?.title_japanese}</p>
              {result?.score ? <RatingDetail /> : null}
              {result?.genres && <Genre />}
              <RankPopularity />
              <ListDetail title="Total Chapters" data={result?.chapters} opt="chapters" />
              <ListDetail title="Type" data={result?.type} />
              <ListDetail title="Status" data={result?.status} />
              <ListDetail title="Published" data={result?.published.string} />
              <ListDetail title="Volumes" data={result?.volumes} />
              <ListStudio />
            </div>
          </div>
          <div className="w-full mt-4">
            <p className="font-bold">Overview :</p>
            {result?.synopsis ? (
              <p className="mt-1">{result?.synopsis}</p>
            ) : (
              <span className="text-red-secondary text-sm">Opss Nothing!!</span>
            )}
          </div>
          <div className="w-full mt-2">
            <p className="font-bold">Reading :</p>
            {result?.serializations.length > 0 ? (
              <Serializations />
            ) : (
              <span className="text-red-secondary text-sm">Opss Nothing!!</span>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default DetailManga