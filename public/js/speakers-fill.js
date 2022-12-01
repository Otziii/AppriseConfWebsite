$(document).ready(function (e) {
    let allSpeakers = []
    let allTalks = []

    let speakerCard = $(".speaker-card");
    let slotCard = $(".slot-entry");

    function getAllSpeakersAndTalks(callback) {
        $.get('../public/data/speakers.json', function (data) {
            allSpeakers = JSON.parse(data)

            $.get('../public/data/talks.json', function (data) {
                allTalks = JSON.parse(data)
                callback()
            }, "text")
        }, "text")
    }

    getAllSpeakersAndTalks(() => {
        speakerCard.each(function (index, element) {
            fillSpeakerCard(element)
        });

        slotCard.each(function (index, element) {
            fillSlotCard(element)
        });
    })

    function fillSpeakerCard(card) {
        let speakerId = card.id
        card = $(card)

        if (speakerId) {
            speakerId = speakerId.replace("speaker-", "")
            let speaker = allSpeakers[speakerId]

            if (speaker) {
                card.children("img").attr("src", speaker.imgSrc)

                card.children("h2").text(speaker.name)
                card.children("h4").text(speaker.employer)
                card.children("p").text(speaker.bio)

                card.css({"display": "flex"})
            }
        }
    }

    function fillSlotCard(card) {
        let talkId = card.id
        card = $(card)

        if (talkId) {
            talkId = talkId.replace("talk-", "")

            let talk = allTalks[talkId]
            if (talk) {
                card.children(".slot-speakers-container").children(".slot-speaker").each(function (index, element) {
                    let speakerId = element.id
                    speakerId = speakerId.replace("talk-speaker-", "")

                    let speakerElement = $(element)
                    let speaker = allSpeakers[speakerId]

                    if (speaker) {
                        speakerElement.children("img").attr("src", speaker.imgSrc)
                        speakerElement.children("span").text(speaker.name)
                    }
                })

                let cardBody = card.children(".slot-entry-body")
                cardBody.children("h5").text(talk.title)
                cardBody.children("p").text(talk.shortDescription)
                cardBody.children("p").text(talk.shortDescription)
                let tags = cardBody.children(".slot-entry-tags");
                tags.empty()

                for (let tag of talk.tags) {
                    tags.append("<span>" + tag + "</span>")
                }
            }
        }
    }

    function clearModals() {
        $(".speaker-modal-container").css({"display": "none"});
        $(".speaker-modal-card").css({"display": "none"});
        $(".talk-modal-container").css({"display": "none"});
    }

    function setHrefOnElement(element, link) {
        if (link) {
            element.css({"display": "inline"})
            element.children("a").attr("href", link)
        } else {
            element.css({"display": "none"})
        }
    }

    function openSlotDetails(talkId) {
        let talk = allTalks[talkId]

        if (talk) {
            let talkContainer = $(".talk-modal-wrapper")

            talkContainer.children("h2").text(talk.title)
            talkContainer.children("p").text(talk.description)
            let tags = talkContainer.children(".slot-entry-tags");
            tags.empty()

            for (let tag of talk.tags) {
                tags.append("<span>" + tag + "</span>")
            }

            let speaker = allSpeakers[talkId]

            talkContainer.children(".slot-speakers-container").children(".slot-speaker").each(function (index, element) {
                let speakerId = talk.speakerIds[index]

                if (speakerId) {
                    let speakerElement = $(element)
                    speakerElement.css({"display": "flex"})
                    let speaker = allSpeakers[speakerId]

                    if (speaker) {
                        speakerElement.children("img").attr("src", speaker.imgSrc)
                        speakerElement.children("span").text(speaker.name)
                    }
                } else {
                    $(element).css({"display": "none"})
                }
            })

            let slotSpeaker = talkContainer.children(".slot-speaker")
            slotSpeaker.attr("id", "slot-speaker-" + talkId)
            slotSpeaker.children("img").attr("src", speaker.imgSrc)
            slotSpeaker.children("span").text(speaker.name)

            talkContainer.css({"display": "flex"})
            $(".talk-modal-container").css({"display": "flex"});
        }
    }

    function openSpeakerDetails(speakerId) {
        let speaker = allSpeakers[speakerId]
        if (speaker) {
            let speakerContainer = $(".speaker-modal-card")
            speakerContainer.children("img").attr("src", speaker.imgSrc)

            if (speaker.keynote) {
                speakerContainer.children(".speaker-keynote").css({"display": "block"})
            } else {
                speakerContainer.children(".speaker-keynote").css({"display": "none"})
            }

            speakerContainer.children("h2").text(speaker.name)
            speakerContainer.children("h4").text(speaker.employer)
            speakerContainer.children("p").text(speaker.bio)

            let speakerTwitter = $("#speaker-twitter");
            setHrefOnElement(speakerTwitter, speaker.twitterTag)

            let speakerGithub = $("#speaker-github");
            setHrefOnElement(speakerGithub, speaker.githubLink)

            let speakerWebsite = $("#speaker-website");
            setHrefOnElement(speakerWebsite, speaker.website)

            speakerContainer.css({"display": "flex"})
            $(".speaker-modal-container").css({"display": "flex"});
        }
    }

    speakerCard.click(function (e) {
        let speakerId = e.currentTarget.id;

        if (speakerId) {
            speakerId = speakerId.replace("speaker-", "")
            clearModals()
            openSpeakerDetails(speakerId)
        }
    })

    $(".back-arrow").click(function (e) {
        clearModals()
    });

    slotCard.click(function (e) {
        let talkId = e.currentTarget.id;

        if (talkId) {
            talkId = talkId.replace("talk-", "")
            clearModals()
            openSlotDetails(talkId)
        }
    })

    $(".slot-speaker").click(function (e) {
        let speakerId = e.currentTarget.id;

        if (speakerId) {
            speakerId = speakerId.replace("slot-speaker-", "")
            clearModals()
            openSpeakerDetails(speakerId)
        }
    })
});